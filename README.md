# BookVerse

A **Book Review Platform** built using the MERN stack (MongoDB, Express, React, Node.js).
Users can sign up, log in, add books, and post reviews with ratings.

---

## 🚀 Features

* User authentication (JWT & bcrypt)
* Add, edit, and delete books
* Review system with ratings and comments
* Pagination for book listings
* Average ratings calculation
* React frontend with protected routes

---

## 🛠️ Tech Stack

* **Frontend:** React, React Router, Axios, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Auth:** JWT, bcrypt

---

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/BookVerse.git
   cd BookVerse
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Create a `.env` file in `/backend` with the following:

   ```
   MONGO_URI=your_mongo_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Run the backend:

   ```bash
   cd backend
   npm run dev
   ```

5. Run the frontend:

   ```bash
   cd frontend
   npm start
   ```

---

## 📂 Project Structure

```
BookVerse/
│── backend/    # Express + MongoDB server
│── frontend/   # React app
│── README.md   # Documentation
```

---

## 📌 API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| POST   | /auth/signup       | Register a new user          |
| POST   | /auth/login        | Login & get JWT token        |
| GET    | /books             | Get paginated list of books  |
| POST   | /books             | Add a new book               |
| GET    | /books/:id         | Get book details & reviews   |
| PUT    | /books/:id         | Edit a book (owner only)     |
| DELETE | /books/:id         | Delete a book (owner only)   |
| POST   | /books/:id/reviews | Add a review to a book       |
| PUT    | /reviews/:id       | Edit a review (owner only)   |
| DELETE | /reviews/:id       | Delete a review (owner only) |
