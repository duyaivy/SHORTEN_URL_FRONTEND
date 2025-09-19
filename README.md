# DomiCare Frontend

## ✨ Overview

**DomiCare** is a modern web platform for home cleaning and maintenance services. This frontend project focuses on delivering a smooth and intuitive user experience, built with React and TypeScript.

> 🚧 This frontend is under active development.

---

## 🚀 Tech Stack

- ⚛️ **React.js** – Fast and responsive UI
- 🔡 **TypeScript** – Type-safe code for robustness
- 🎨 **Tailwind CSS** – Utility-first styling for rapid UI building
- 🧩 **shadcn/ui** – Beautiful and accessible UI components
- 🔄 **React Router** – Client-side routing
- 🔗 **Axios** – RESTful API communication
- 🧼 **Prettier** + 🦊 **Husky** – Code formatting and git hooks for quality

---

## 🧪 Getting Started

### Development Setup

```bash
# Clone the repository
git clone https://github.com/duyaivy/DOMICARE_FRONTEND.git

cd DOMICARE_FRONTEND

# Install dependencies
yarn install

# Start the development server
yarn dev
```

Open your browser at `http://localhost:4000`.

---

## 🌐 Environment Variables

Create a `.env` file in the root directory and add:

```bash
VITE_API_URL=https://localhost:8443
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

---

## 🖥️ Pages & UI Modules

- 🔐 Login / Signup
- 🏠 Homepage
- 📊 Service Dashboard
- 📆 Booking Form
- ⭐ Service Rating & Feedback
- 📜 Service History
- 🧑‍💼 Sales & Technician Dashboards
- ⚙️ Admin Panel (CRUD for services, users, orders)

---

## 📌 Role-based Features

### 👤 Customer

- Search and book services
- View service history and provide ratings
- Schedule services via form or contact

### 🧑‍💼 Sales Staff

- Login and manage customer orders
- Confirm orders and track performance

### 🛠️ Technician

- Receive job details
- Upload images and confirm task completion
- Request customer feedback

### 🛡️ Admin

- Manage staff, customers, orders, and services
- Publish promotional posts or service news

---

## 🔒 Backend Overview (Brief)

The backend is built with:

- **Spring Boot + JWT** for secure APIs
- **PostgreSQL** for database
- **Cloudinary** for image handling
- **JavaMail** for notifications
- **Swagger/OpenAPI** for documentation

> Backend repository: [DomiCare Website (Spring Boot)](https://github.com/hnagnurtme/DomiCare_Website.git)

---

Made with 💖 by **duyaivy**
