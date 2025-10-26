# 🔗 ShortLink Frontend – Modern Link Shortening & QR Management App

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-4.0-yellow.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38BDF8.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

> **A fast, responsive, and scalable frontend built with React, empowering the ShortLink platform for URL shortening, QR generation, and analytics.**

---

## 🌟 Introduction

**ShortLink Frontend** is the client-facing web application for the **ShortLink platform**, offering a smooth and modern experience for link management.  
Built with **React + TypeScript + Vite**, it integrates seamlessly with the **ShortLink Backend** REST APIs to provide real-time URL shortening, QR code scanning, and statistics.

---

## 🧠 Tech Stack

### **Frontend**

![ReactJS](https://img.shields.io/badge/ReactJS-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![i18next](https://img.shields.io/badge/i18next-26A69A?style=flat-square)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square)
![html5-qrcode](https://img.shields.io/badge/html5--qrcode-FF6B00?style=flat-square)
![Sonner](https://img.shields.io/badge/Sonner-Toast--System-orange?style=flat-square)

### **Dev Tools**

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)
![Husky](https://img.shields.io/badge/Husky-git%20hooks-red?style=flat-square)
![pnpm](https://img.shields.io/badge/pnpm-3B12F2?style=flat-square&logo=pnpm&logoColor=white)

---

## ⚙️ Features

| Feature                      | Description                                                            |
| ---------------------------- | ---------------------------------------------------------------------- |
| 🔑 **Authentication**        | Login / Register / Logout using JWT from backend API.                  |
| 🔗 **URL Shortening (CRUD)** | Create, update, and manage short URLs with alias and password support. |
| 📷 **QR Scanning**           | Scan QR codes directly from webcam using `html5-qrcode`.               |
| 🧾 **QR History Management** | Automatically store and display history of scanned QR codes.           |
| 📊 **Analytics Overview**    | View link visit statistics and usage history.                          |
| 🌍 **Multi-language (i18n)** | Full localization via `i18next`.                                       |
| 🧠 **Smart Caching**         | Background data fetching and caching using React Query.                |
| 💅 **Modern UI/UX**          | Built with TailwindCSS, Sonner notifications, and Lottie icons.        |

---

## 🗂️ Project Structure

```
📦 shortlink-frontend/
├── src/
│   ├── apis/                   # API request hooks and logic
│   │   ├── auth.api.ts
│   │   ├── url.api.ts
│   │   └── user.api.ts
│   ├── assets/                 # Icons, images, and animations
│   ├── components/             # Reusable UI components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── ErrorBoundary/
│   │   ├── AuthLayout/
│   │   ├── ui/                 # ShadcnUI
│   │   └── And more...
│   ├── contexts/               # Global AppContext and AuthProvider
│   ├── hooks/                  # Custom hooks
│   ├── pages/                  # App pages (Home, Login, Dashboard, etc.)
│   ├── services/               # Axios and request services
│   ├── constants/              # Enums, routes, and global constants
│   ├── main.tsx                # Entry point
│   ├── App.tsx                 # Root component
│   └── index.css               # Tailwind & global styles
├── tsconfig.json
├── vite.config.ts
├── package.json
└── README.md
```

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment file
cp .env.example .env

# 3. Run development server
pnpm dev

# 4. Build for production
pnpm build

# 5. Preview production build
pnpm preview
```

## 🧩 Backend Overview

The **ShortLink Frontend** connects to a powerful **Node.js + ExpressJS Backend** that handles all logic for link shortening, QR generation, authentication, and analytics.

| Tech              | Description                                              |
| ----------------- | -------------------------------------------------------- |
| ⚙️ **Framework**  | ExpressJS (TypeScript)                                   |
| 🧱 **Database**   | MongoDB                                                  |
| 🔐 **Auth**       | JWT (Access + Refresh Tokens)                            |
| 🧾 **Validation** | Zod / Joi Schema Validation                              |
| 📦 **Features**   | URL CRUD, QR History, Email Notifications, Rate Limiting |
| 🧰 **Deployment** | Docker + Render / Railway                                |

🔗 **Backend Repository:** [ShortLink Backend on GitHub](https://github.com/your-username/shortlink-backend)

## 💎 Author & Contact

👨‍💻 **Project:** ShortLink
📧 **Contact:** shortlink.tool@gmail.com  
🌐 **Website:** [https://shortlinkz.online](https://shortlinkz.online)

---

> Made by duyaivy with 💖.
