# 🏢 Employee Management & Task Tracking System

A full-stack, role-based Employee and Task Management application built using **Node.js, Express, MongoDB, React 19, Tailwind CSS, and Vite**.

The system enables organizations to streamline employee onboarding, assign and track tasks with priority levels, visualize real-time team performance, and manage daily operations through dedicated portals for **Administrators** and **Employees**.

---

## ✨ Features

### 👑 Admin Portal
- **Interactive Dashboard**: High-level metrics for total employees, active tasks, pending reviews, and completion rates.
- **Task Management**: Create, assign, edit, and delete tasks with priority levels (`High`, `Medium`, `Low`), categories, and due dates.
- **Employee Directory**: Onboard new staff members, assign departmental roles, and manage employee records.
- **Quick Actions**: One-click shortcuts to initiate task assignment, employee registration, and bulk task reviews.
- **Task Overview & Filters**: Search, filter, and inspect tasks across the entire organization.

### 💼 Employee Portal
- **Personalized Workspace**: View assigned tasks categorized by status (`New`, `In Progress`, `Completed`, `Failed`).
- **Real-Time Status Updates**: Seamlessly transition task status as work progresses.
- **Task Details & Work Notes**: Inspect full task briefs, deadlines, and maintain private task notes.
- **Profile Management**: View personal employment info, role details, and update profile avatars.

### 🛡️ Security & Authentication
- **Role-Based Access Control (RBAC)**: Enforced via JWT authorization middleware on the backend and protected routes on the frontend.
- **Password Security**: Strong hashing with `bcrypt`.
- **API Protection**: Hardened with `helmet`, CORS policies, and rate-limiting on sensitive endpoints (`express-rate-limit`).
- **Input Validation**: Request payload sanitization and validation using `express-validator`.
- **Smooth Auth Routing**: Integrated `RootRedirect` and `GuestRoute` preventing flicker or redirect loops.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express 5](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `cookie-parser`
- **Security**: `helmet`, `bcrypt`, `express-rate-limit`, `cors`

---

## 📁 Project Structure

```text
Employee Management System/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route controllers (auth, employee, task)
│   │   ├── db/               # Database connection setup
│   │   ├── middleware/       # Auth, RBAC, rate-limiting, and validation
│   │   ├── model/            # Mongoose schemas (User, Employee, Task)
│   │   ├── routes/           # Express API route declarations
│   │   ├── seeders/          # Admin initialization scripts
│   │   └── app.js            # Express app configuration & middleware
│   ├── server.js             # HTTP server entry point
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/              # Axios instance with interceptors
│   │   ├── components/       # UI components (Admin, Employee, Auth, Modals)
│   │   ├── context/          # AuthContext for global session state
│   │   ├── pages/            # Page views (Dashboards, Tasks, Profile, etc.)
│   │   ├── App.jsx           # Main routing configuration
│   │   └── main.jsx          # React DOM entry point
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (or yarn/pnpm)
- **MongoDB** instance (Local MongoDB server or MongoDB Atlas cluster)

---

### 1. Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

4. *(Optional)* Seed the initial administrator account:
   ```bash
   node src/seeders/createFirstAdmin.js
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   # or
   npx nodemon server.js
   ```
   The backend API will run on `http://localhost:3000`.

---

### 2. Frontend Setup

1. Open another terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

---

## 📡 API Endpoints

### 🔐 Authentication (`/account`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/account/signup` | Register a new administrator | Admin only |
| `POST` | `/account/login` | Authenticate user & issue JWT | Public (Rate-limited) |
| `POST` | `/account/logout` | Invalidate current user session | Authenticated |
| `GET` | `/account/me` | Fetch active user credentials | Authenticated |
| `PUT` | `/account/profile` | Update user details & avatar | Authenticated |
| `PUT` | `/account/change-password` | Update current account password | Authenticated |

### 👥 Employees (`/employee`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/employee/create` | Register a new employee | Admin only |
| `GET` | `/employee/all` | Retrieve all registered employees | Admin only |
| `GET` | `/employee/profile/me` | Get personal employee record | Employee only |
| `GET` | `/employee/:id` | Fetch specific employee details | Admin & Employee |
| `PUT` | `/employee/update/:id` | Modify an employee's details | Admin only |
| `DELETE` | `/employee/:id` | Remove an employee record | Admin only |

### 📋 Tasks (`/tasks`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/tasks/create` | Create and assign a task | Admin only |
| `GET` | `/tasks/` | Fetch all company tasks | Admin only |
| `GET` | `/tasks/my` | Fetch tasks assigned to the current employee | Employee only |
| `GET` | `/tasks/:id` | Retrieve single task record | Admin & Employee |
| `PUT` | `/tasks/update/:id` | Edit task details, deadline, or assignee | Admin only |
| `PATCH`| `/tasks/:id/status` | Update task progress status | Employee only |
| `DELETE`| `/tasks/:id` | Delete a task | Admin only |

---

## 🧪 Default Test Credentials

If you seeded the database using `createFirstAdmin.js`:
- **Email:** Value specified in your `ADMIN_EMAIL` 
- **Password:** Value specified in your `ADMIN_PASS` 
- **Role:** `admin`

---


