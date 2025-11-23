

# **HRMS2 - Human Resource Management System**

## **Project Overview**

HRMS2 is a full-stack Human Resource Management System built with **Node.js**, **Express**, **MySQL**, and **React.js**.
It allows organizations to manage **employees, teams, and assignments**, with JWT-based authentication and role-based logging for audit purposes.

### **Features**

* User authentication with JWT
* Create, update, and delete **employees**
* Create, update, and delete **teams**
* Assign employees to teams
* Dashboard to view employees and teams
* Audit logging of all actions
* React frontend with dynamic forms and minimal UI
* RESTful API with secure endpoints

---

## **Project Structure**

```
hrms2/
├─ backend/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ config/
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ src/
│  │  ├─ components/
│  │  ├─ pages/
│  │  ├─ App.js
│  │  └─ index.js
│  ├─ public/
│  └─ package.json
└─ README.md
```

---

## **Setup Instructions**

### **1. Backend Setup**

1. Open terminal in `backend` folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=0610
DB_NAME=hrms2db
JWT_SECRET=71c1b325-d8d2-4433-b48d-85557a845172
PORT=5000
```

4. Sync database and seed data:

```bash
node seed.js
```

5. Start backend server:

```bash
npm run dev
```

**Backend runs at:** `http://localhost:5000`

---

### ** Frontend Setup**

1. Open terminal in `frontend` folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend server:

```bash
npm start
```

**Frontend runs at:** `http://localhost:3000`

---

## ** Seed Script**

* The backend seed script (`seed.js`) inserts:

  * Sample organisations
  * Sample teams
  * Sample employees

Run the seed script anytime to reset or initialize your database:

```bash
node seed.js
```

---

## ** API Endpoints**

### **Authentication**

* `POST /api/auth/login` - User login

### **Employee Management**

* `GET /api/employees` - List all employees
* `POST /api/employees` - Create a new employee
* `PUT /api/employees/:id` - Update employee details
* `DELETE /api/employees/:id` - Delete an employee

### **Team Management**

* `GET /api/teams` - List all teams
* `POST /api/teams` - Create a new team
* `POST /api/teams/:teamId/assign` - Assign employees to a team
* `GET /api/teams/:teamId/employees` - Get all employees in a team

### **Logs (Audit)**

* `GET /api/logs` - View action logs (admin only)

> **Note:** All protected routes require a JWT in the Authorization header:

```
Authorization: Bearer <your_token_here>
```

---

## ** Frontend Pages & Routes**

| Page                  | Route                    | Description                     |
| --------------------- | ------------------------ | ------------------------------- |
| Login                 | `/login`                 | Login form                      |
| Register Organisation | `/register-organisation` | Add a new organisation          |
| Dashboard             | `/`                      | Overview of employees and teams |
| Employees             | `/employees`             | List of employees               |
| Add Employee          | `/employees/new`         | Employee creation form          |
| Teams                 | `/teams`                 | List of teams                   |
| Add Team              | `/teams/new`             | Team creation form              |

---




## ** Logging & Audit**

* Every action (create/update/delete) writes a log in `logs` table.
* Log example:

```json
{
  "action": "employee_created",
  "user_id": 1,
  "meta": { "employee_id": 4, "first_name": "Alice" },
  "timestamp": "2025-11-24T00:50:37Z"
}
```

* Admin can view logs with filters via `GET /api/logs`.

---

## ** Credits**

* Developed by **Mugilan **
* Full-stack project combining **React.js**, **Node.js**, **Express**, **MySQL**, **Sequelize**, **Postman**.

---
