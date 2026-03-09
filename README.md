# MERN Practice (Backend)

**MERN Practice (Backend)** is a robust and scalable RESTful API designed to serve as the data backbone for a task management ecosystem. Built with **Node.js** and **Express.js**, this project demonstrates advanced server-side patterns, including database connection optimization, custom middleware implementation, and secure CRUD operations with **MongoDB**.

The server is engineered for high performance and reliability, featuring a singleton connection pattern that prevents database overhead and strict validation schemas to ensure data integrity across all endpoints.

<img width="771" height="633" alt="mern-backend" src="https://github.com/user-attachments/assets/c82a3dec-8f9e-40d3-b326-779423634ae3" />


✨ **Overview**

MERN Practice (Backend) is not just a simple server; it is a **production-ready API architecture** that emphasizes:

* **Optimized Persistence:** Leveraging Mongoose for schema modeling and efficient MongoDB Atlas integration.
* **Smart Connection Logic:** Implementation of a connection-pooling strategy to handle requests efficiently in serverless environments.
* **Robust CRUD API:** A complete set of RESTful endpoints with proper HTTP status codes and error handling.
* **Data Security:** Integrated validation logic to sanitize inputs and verify ObjectID formats before database interaction.
* **Environment Management:** Secure handling of sensitive credentials using `dotenv`.

🚀 **Features**

* ⚡ **Express.js Engine:** High-speed routing and middleware configuration.
* 🗄️ **MongoDB Integration:** Seamless data persistence with Mongoose schemas.
* 🛡️ **ID Validation:** Custom logic to prevent server crashes on invalid database queries.
* 🌐 **CORS Enabled:** Configured for secure cross-origin communication with the frontend.
* 🩺 **Health Check Endpoint:** Root route for instant server status monitoring.
* 🔄 **Async/Await Flow:** Modern JavaScript patterns for clean, non-blocking code.
* 📦 **Production Ready:** Optimized for deployment on platforms like Vercel or Heroku.

🛠️ **Tech Stack**

| Category | Technology |
| --- | --- |
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Database** | MongoDB (Atlas) |
| **ORM** | Mongoose |
| **Environment** | Dotenv |
| **Deployment** | Vercel |

💻 **Getting Started**

**Prerequisites**

* Node.js 18+
* MongoDB Atlas Connection String

**Installation**

```bash
# Clone the repository
git clone https://github.com/SALVADORPOETA/mern-practice-backend.git

# Navigate into the project directory
cd mern-practice-backend

# Install dependencies
npm install

```

**Environment Variables**
Create a `.env` file in the root directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000

```

**Start the Server**

```bash
# Production mode
npm start

# Development mode (if nodemon is installed)
npm run dev

```

⚙️ **API Endpoints**

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/` | API Health Check & Status |
| **GET** | `/items` | Fetch all tasks from the database |
| **GET** | `/items/:id` | Fetch a single task by its unique ID |
| **POST** | `/items` | Create a new task item |
| **PUT** | `/items/:id` | Update an existing task with validation |
| **DELETE** | `/items/:id` | Remove a task from the database |

📂 **Project Structure**

```text
mern-practice-backend/
├─ models/
│  └─ Item.js         # Mongoose Schema & Data Model
├─ server.js          # Main Entry: Connection logic, Middlewares & Routes
├─ .env                # Environment variables (Gitignored)
└─ package.json       # Dependencies & Scripts

```

📌 **Originality Statement**

This backend is **100% original**:

* The database connection management was custom-built to handle serverless lifecycle events.
* No boilerplate generators were used; every route and middleware was manually configured.
* **MERN Practice (Backend)** serves as a professional demonstration of backend engineering, database modeling, and API design.

