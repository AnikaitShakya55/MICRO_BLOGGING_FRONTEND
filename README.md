# 📝 Microblogging Platform (Blog App)

A full-stack microblogging application where users can register, log in, create blogs, follow/unfollow users, see blogs according to following. Built using **React**, **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Features

- 🔐 JWT-based User Authentication (Register/Login)
- 📝 Create, Edit, Delete Blogs
- 🧑‍🤝‍🧑 Follow/Unfollow Users
- 📜 Personalized Feed
- 🔔 Snackbar Notifications

---

## 🛠️ Tech Stack

### Frontend

- React + TypeScript
- Redux Toolkit (for snackbar state)
- React Router DOM
- Tailwind CSS

### Backend

- Node.js + Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt (Password Hashing)
- CORS, dotenv

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/AnikaitShakya55/MICRO_BLOGGING_FRONTEND.git

# 2. Navigate into the project directory
cd MICRO_BLOGGING_FRONTEND

# 3. Install all dependencies
npm install

# 4. Create a .env file in the root and add the following:
# (Replace with your deployed backend URL if needed)
REACT_APP_BACKEND_URL_ENDPOINT=http://localhost:5000/api

# 5. Start the development server
npm start

# The app will run at http://localhost:3000

```
