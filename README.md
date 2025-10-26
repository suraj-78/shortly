<div align="center">

# 🌐 Shortly - URL Shortener

![Shortly Banner](assets/shortly-banner.png)

A modern, full-stack **URL shortener** built with **Node.js**, **React**, **PostgreSQL**, and **Redis**.  
Create short, manageable links, track performance, and manage them through a sleek dashboard.

---

### 🧠 Built With

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-D9281A?style=for-the-badge&logo=redis&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

</div>

---

## 🚀 Live Demo

> *(Optional — replace with your live links when available)*  
**Frontend:** https://shortly.example.com  
**Backend API:** https://api.shortly.example.com

---

## ✨ Features

- 🔗 **Instant URL Shortening** — Generate short, unique alphanumeric links in seconds.  
- 🔐 **Secure Authentication** — JWT-based login system for personalized URL management.  
- 📊 **Analytics Dashboard** — Track click counts and manage links visually.  
- ⚡ **Redis Caching** — Ultra-fast redirections for frequently accessed links.  
- 📱 **Responsive UI** — Optimized for desktop and mobile devices.  
- 🔄 **RESTful API** — Consistent API architecture built with Express.js.

---

## 🧱 Tech Stack

**Frontend:** React (Vite), Tailwind CSS, shadcn/ui, React Router DOM, Axios  
**Backend:** Node.js, Express.js, Prisma ORM  
**Database:** PostgreSQL  
**Cache:** Redis  
**Auth:** JWT, Bcrypt  
**Deployment:** Vercel, Render, Docker

---

## 🏗️ Repository Structure

shortly/
├── frontend/ # React (Vite) frontend
│ ├── public/
│ ├── src/
│ └── package.json
├── backend/ # Node.js (Express) backend
│ ├── prisma/
│ ├── src/
│ └── package.json
└── README.md


---

## ⚙️ Getting Started

### **Prerequisites**

- Node.js ≥ 18  
- npm / yarn  
- Docker & Docker Compose (optional for DB + Redis)  
- Git

---

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/your-username/shortly.git
cd shortly

2️⃣ Setup Backend
cd backend
npm install


Create a .env file:

DATABASE_URL=postgresql://user:password@localhost:5432/shortly
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
CORS_ALLOWED_ORIGINS=http://localhost:5173
PORT=8080


Run PostgreSQL & Redis via Docker (optional):

docker-compose up -d


Apply migrations:

npx prisma migrate dev


Start server:

npm run dev

3️⃣ Setup Frontend
cd ../frontend
npm install


Create a .env file:

VITE_API_URL="http://localhost:8080/api"


Start development server:

npm run dev


Access: http://localhost:5173

📊 API Overview
Public Endpoints
Method	Endpoint	Description
GET	/health	Health check
POST	/api/user/register	Register new user
POST	/api/user/login	Authenticate user
GET	/{shortCode}	Redirect to original URL
GET	/api/{shortCode}	Get URL metadata
Authenticated Endpoints (JWT Required)
Method	Endpoint	Description
GET	/api/user/me	Get logged-in user
GET	/api/user/logout	Logout current session
POST	/api/url/create	Create short URL
GET	/api/urls	List all URLs
PATCH	/api/url/update	Update existing URL
DELETE	/api/url/{urlId}	Delete URL
GET	/api/url/analytics/{shortCode}	Get click analytics
🔧 Configuration
Backend .env
DATABASE_URL=your_postgres_url
REDIS_URL=your_redis_url
JWT_SECRET=your_secret
CORS_ALLOWED_ORIGINS=http://localhost:5173
PORT=8080

Frontend .env
VITE_API_URL=http://localhost:8080/api

🚢 Deployment Guide
Frontend (React)
npm run build


Deploy to Vercel, Netlify, or GitHub Pages

Output directory: dist

Backend (Express)

Deploy to:

Render, Railway, Vercel Functions, or AWS Lambda

Use hosted DB (e.g., Neon, Supabase, AWS RDS)

Use hosted Redis (e.g., Upstash, ElastiCache)

Configure CORS and environment variables properly.

🧩 Example .env Files
Backend
DATABASE_URL=postgresql://user:password@localhost:5432/shortly
REDIS_URL=redis://localhost:6379
JWT_SECRET=mysecretkey
CORS_ALLOWED_ORIGINS=http://localhost:5173
PORT=8080

Frontend
VITE_API_URL=http://localhost:8080/api

🧪 Testing & Linting

Run backend tests (if available):

npm run test


Run linter:

npm run lint

🤝 Contributing

Contributions are welcome! 💡

Fork the repo

Create a feature branch

git checkout -b feature/your-feature


Commit your changes

git commit -m "Add your feature"


Push and Open a PR

git push origin feature/your-feature

🧑‍💻 Author

Your Name
📧 your.email@example.com

💻 GitHub
 | LinkedIn

 <div align="center">
💡 Built with ❤️ using Node.js, React, Prisma, PostgreSQL, and Redis.

</div> ```




