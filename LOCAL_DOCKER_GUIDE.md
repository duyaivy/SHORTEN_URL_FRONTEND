# 🐳 Hướng Dẫn Test Local Docker - Full Stack

## 📐 Kiến trúc local

```
Browser (http://localhost hoặc http://192.168.1.13)
           │
           ▼
┌──────────────────────────────────────────────────────┐
│  Container: frontend (Nginx :80)                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ /a/*      → Serve React SPA static files    │    │
│  │ /api/*    → Load Balance → BE cluster       │    │
│  │ /<code>   → Proxy → BE /view/<code>         │    │
│  │ /         → Redirect 301 → /a/              │    │
│  └─────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
         │ upstream backend_cluster (least_conn)
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│ BE N1 │ │ BE N2 │  ← shortlink-backend:local
│ :8080 │ │ :8080 │     (dùng chung 1 image)
└───┬───┘ └──┬────┘
    └────┬────┘
         │ chia sẻ cùng DB + Redis
    ┌────┴───────┐
    │            │
┌───▼───┐  ┌────▼──┐
│MongoDB│  │ Redis │
│:27017 │  │ :6379 │
└───────┘  └───────┘
```

## 🚀 Cách chạy (Full Stack)

### Bước 1: Chuẩn bị .env.local
```bash
cd SHORTEN_URL_FRONTEND
cp .env.local.example .env.local
# Điền các giá trị thật vào .env.local
```

### Bước 2: Build và chạy
```bash
# Từ thư mục SHORTEN_URL_FRONTEND
docker compose -f docker-compose.local.yml --env-file .env.local up --build

# Hoặc chạy nền
docker compose -f docker-compose.local.yml --env-file .env.local up --build -d
```

### Bước 3: Truy cập
- 🌐 App: http://localhost hoặc http://192.168.1.13
- 📡 BE Node 1 (qua nginx): http://localhost/api/
- 🔴 Redis: localhost:6379
- 🍃 MongoDB: localhost:27017

## 🔧 Các lệnh hữu ích

```bash
# Xem logs tất cả container
docker compose -f docker-compose.local.yml logs -f

# Xem logs riêng từng service
docker compose -f docker-compose.local.yml logs -f frontend
docker compose -f docker-compose.local.yml logs -f backend_node1
docker compose -f docker-compose.local.yml logs -f backend_node2

# Kiểm tra health
docker compose -f docker-compose.local.yml ps

# Test load balancing (xem X-Backend-Server header hoặc log)
for i in {1..10}; do curl -s http://localhost/api/health; done

# Dừng tất cả
docker compose -f docker-compose.local.yml down

# Dừng và xóa volumes (reset DB)
docker compose -f docker-compose.local.yml down -v

# Rebuild lại BE sau khi sửa code
docker compose -f docker-compose.local.yml up --build backend_node1 backend_node2
```

## ⚖️ So sánh Local vs VPS thực tế

| Yếu tố | Local Docker Compose | VPS thực tế |
|--------|---------------------|-------------|
| **Nginx upstream** | Service names (backend_node1) | IP VPS2 (VPS2_IP:8080) |
| **SSL** | ❌ HTTP only | ✅ HTTPS + Let's Encrypt |
| **Domain** | localhost / 192.168.1.13 | url.duyaivy.id.vn |
| **MongoDB** | Container local | MongoDB Atlas (remote) |
| **Redis** | Container local | Redis Cloud (remote) |
| **Image source** | Build local | Pull từ GHCR |
| **Vite VITE_API_URL** | http://localhost/api | https://api.yourdomain.com |
| **CORS** | http://localhost | https://yourdomain.com |
| **Google OAuth redirect** | http://localhost/a | https://yourdomain.com/a |

## ⚠️ Lưu ý quan trọng

1. **Google OAuth** sẽ KHÔNG hoạt động với localhost nếu chưa thêm `http://localhost/a` vào
   Authorized Redirect URIs trong Google Cloud Console.

2. **reCAPTCHA** domain phải được đăng ký trên Google reCAPTCHA console cho `localhost`.

3. **Vite VITE_* vars** được bake vào lúc `docker build` (build-time args), không thể thay đổi
   sau khi build xong. Nếu đổi URL → phải rebuild FE image.

4. **CORS_ORIGIN** trong BE phải khớp với domain FE gọi API từ đó.
   Local: `http://localhost` (Nginx trên cùng network, FE gọi tới `/api/` trên cùng origin)

## 🐛 Debug load balancing

Thêm header debug vào nginx.local.conf nếu muốn xem BE nào xử lý request:
```nginx
location /api/ {
    add_header X-Upstream-Server $upstream_addr always;  # thêm dòng này
    proxy_pass http://backend_cluster;
    ...
}
```
Sau đó: `curl -I http://localhost/api/health | grep X-Upstream`
