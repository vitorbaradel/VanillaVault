<a name="top"></a>

<div align="center">

# VanillaVault

**A full-stack user management system — REST API with JWT authentication and a modular Vanilla JS frontend.**

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

</div>

A full-stack project built to practice the complete cycle of a real web application — from database to interface. The backend exposes a RESTful API with JWT authentication and role-based access control. The frontend consumes it using Vanilla JS and Axios, with modular structure, smart error handling, and visual feedback via custom modals and Toastify notifications.

No frameworks. No shortcuts. Just the fundamentals done right.

---

## How it works

**Backend:** When a user registers, the password is encrypted with bcrypt before being stored in MongoDB. On login, the API validates the credentials and returns a JWT token. Protected routes verify this token on every request — admin routes go further and check the user's role before allowing updates or deletions.

**Frontend:** The interface communicates with the API through Axios. Every action — registration, login, profile update — triggers visual feedback via Toastify toasts or custom modals. A smart registration flow detects when a name is missing and offers to extract it from the email automatically.

```
[Browser]  ←→  [Vanilla JS + Axios]  ←→  [Express API]  ←→  [MongoDB]
                      ↓                          ↓
               Toastify / Modals           JWT + bcrypt
```

---

## Features

- User registration with bcrypt password encryption
- JWT authentication with protected and public routes
- Role-based access control — admin-only routes for UPDATE and DELETE
- Complete CRUD: create, list, update, and delete users
- Smart registration: detects missing name and offers to use the email's first segment
- Visual feedback with Toastify notifications and custom modals
- Modular frontend architecture with reusable utils
- Logout with session termination

---

## Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Bcrypt
- Dotenv

**Frontend**
- HTML5 + CSS3
- JavaScript ES6+ (Vanilla)
- Axios
- Toastify
- Font Awesome

---

## Project Structure

```
NodeCRUD/
│
├── backend/
│   ├── config/                  # App setup and global middlewares
│   ├── connection/              # MongoDB connection
│   ├── controllers/             # Route logic (public + admin + private)
│   ├── middlewares/             # JWT verification and input validation
│   ├── models/                  # Mongoose schemas
│   ├── routes/
│   │   ├── public/              # /register, /login
│   │   └── private/             # Admin and user protected routes
│   ├── services/                # Business logic layer
│   ├── utils/                   # Helper functions
│   ├── .env                     # Environment variables (not tracked)
│   └── server.js                # Entry point
│
└── frontend/
    ├── assets/                  # SVGs and media
    ├── config/                  # API base URL config
    ├── css/                     # Styles per page
    ├── pages/                   # HTML pages
    ├── services/                # Per-page JS logic and API calls
    ├── utils/                   # Reusable functions (toast, modal, validation)
    └── index.html               # App gateway
```

---

## Getting Started

**1. Clone the repository**
```bash
git clone https://github.com/ScatmanVit/NodeCRUD.git
cd NodeCRUD
```

**2. Set up the backend**
```bash
cd backend
npm install
```

Create a `.env` file in the backend root:
```
URL_DATABASE=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=3000
```

Start the server:
```bash
npm run dev
```

**3. Set up the frontend**

Open `frontend/config/url_api.js` and set the API base URL:
```js
const API_BASE_URL = "http://localhost:3000";
```

Then open `frontend/index.html` in your browser or use the Live Server extension in VSCode.

---

## API Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/register` | Register a new user | No |
| POST | `/login` | Authenticate and return JWT | No |
| GET | `/logout` | End user session | Yes (JWT) |
| GET | `/admin/list-users` | List all users | Yes (JWT) |
| PUT | `/admin/update/user/:id` | Update a user | Yes (JWT) |
| DELETE | `/admin/delete/user/:id` | Delete a user | Yes (JWT) |

---

## What I Learned

- How to structure a RESTful API with separation of concerns
- JWT authentication flow from token generation to route protection
- Role-based access control with custom middlewares
- Password encryption and verification with bcrypt
- How to consume a real API from a frontend without any framework
- Modular frontend architecture with reusable utility functions
- Smart UX decisions: detecting missing fields and offering recovery flows

<br>

<div align="center">

<a href="#top">↑ back to top</a>

</div>
