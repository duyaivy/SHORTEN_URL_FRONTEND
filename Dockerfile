# ============================================================
# Stage 1: Builder - Build React app with PNPM
# ============================================================
FROM node:20-alpine AS builder

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

WORKDIR /app

# Copy package manifests first for better layer caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies (frozen lockfile for reproducibility)
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build arguments for Vite environment variables (injected at build time)
ARG VITE_API_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_SERVER_ALIAS_URL
ARG VITE_REDIRECT_URI
ARG VITE_GOOGLE_URL
ARG VITE_SITE_KEY_CAPCHA

# Make build args available as env vars for Vite build
ENV VITE_API_URL=$VITE_API_URL \
    VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID \
    VITE_SERVER_ALIAS_URL=$VITE_SERVER_ALIAS_URL \
    VITE_REDIRECT_URI=$VITE_REDIRECT_URI \
    VITE_GOOGLE_URL=$VITE_GOOGLE_URL \
    VITE_SITE_KEY_CAPCHA=$VITE_SITE_KEY_CAPCHA

# Build production bundle
RUN pnpm run build

# ============================================================
# Stage 2: Production - Nginx serving static files + Load Balancer
# ============================================================
FROM nginx:1.27-alpine AS production

# Remove default nginx config & html
RUN rm -rf /usr/share/nginx/html/* && \
    rm -f /etc/nginx/conf.d/default.conf

# Copy built static files to /usr/share/nginx/html/a (matching Vite base: '/a/')
COPY --from=builder /app/dist /usr/share/nginx/html/a

# Set default env vars for template substitution (envsubst at startup)
ENV VPS2_IP=127.0.0.1 \
    NGINX_ENVSUBST_FILTER=VPS2_IP

# Copy custom nginx template (Nginx docker entrypoint will automatically render default.conf using envsubst)
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Expose HTTP and HTTPS ports
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
