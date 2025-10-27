<div align="center">

# 🌐 Shortly - URL Shortener

![Shortly Banner](/images/image.png)

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


[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](CONTRIBUTING.md)

</div>

---

## 📸 Screenshots

| Homepage | Dashboard | Create Link |
| :-------: | :--------: | :--------: |
| ![Homepage Screenshot](./images/home.png) | ![Dashboard Screenshot](./images/dashboard.png) | ![Analytics Screenshot](./images/create.png) |


---

## 🚀 Live Demo

https://shortly-tan-six.vercel.app/

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
**Deployment:** Vercel

---

## 🏗️ Repository Structure
```
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

```

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
git clone https://github.com/suraj-78/shortly.git
cd shortly
```


### **2️⃣ Setup Backend**
```bash
cd backend
npm install

#Create a .env file:

DATABASE_URL=postgresql://user:password@localhost:5432/shortly
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
CORS_ALLOWED_ORIGINS=http://localhost:5173
PORT=8080
```

**Apply migrations:**

```bash
npx prisma migrate dev
```

**Start server:**
```bash
npm run dev
```

### **3️⃣ Setup Frontend**
```bash
cd ../frontend
npm install
```


**Create a .env file:**

```bash
VITE_API_URL="http://localhost:8080/api"
```


**Start development server:**

```bash
npm run dev
```

Access: http://localhost:5173
---

## API Endpoints Summary

| Method  | Endpoint                          | Description                     | Auth Required |
| :------ | :-------------------------------- | :------------------------------ | :------------ |
| `GET`   | `/health`                         | Health check                    | No            |
| `POST`  | `/api/user/register`              | Register new user               | No            |
| `POST`  | `/api/user/login`                 | Authenticate user               | No            |
| `GET`   | `/{shortCode}`                    | Redirect to original URL        | No            |
| `GET`   | `/api/{shortCode}`                | Get URL metadata                | No            |
| `GET`   | `/api/user/me`                    | Get logged-in user              | Yes           |
| `GET`   | `/api/user/logout`                | Logout current session          | Yes           |
| `POST`  | `/api/url/create`                 | Create short URL                | Yes           |
| `GET`   | `/api/urls`                       | List all URLs                   | Yes           |
| `PATCH` | `/api/url/update`                 | Update existing URL             | Yes           |
| `DELETE`| `/api/url/{urlId}`                | Delete URL                      | Yes           |
| `GET`   | `/api/url/analytics/{shortCode}`  | Get click analytics             | Yes           |

---


## 🔧 Configuration

### 🖥️ Backend `.env`
```env
DATABASE_URL=your_postgres_url
REDIS_URL=your_redis_url
JWT_SECRET=your_secret
CORS_ALLOWED_ORIGINS=http://localhost:5173
PORT=8080
```


### Frontend .env

```bash
VITE_API_URL=http://localhost:8080/api
```
---

## 🤝 Contributing

Contributions are welcome! 💡

1. **Fork** the repository  
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Commit your changes**


    ```bash
    git commit -m "Add your feature"
    ```
4. **Push and open a Pull Request**
    ```bash
    git push origin feature/your-feature
    ```
---

## 🧑‍💻 Author

**Your Name**  
📧 suraj.2201082cs@iiitbh.ac.in  
💻 [GitHub](https://github.com/suraj-78) | [LinkedIn](www.linkedin.com/in/ssp001)

---

<div align="center">

Built with ❤️ using **Node.js**, **React**, **Prisma**, **PostgreSQL**, and **Redis**.

</div>

---



