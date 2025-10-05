# BookVerse

A **Book Review Platform** built using the MERN stack (MongoDB, Express, React, Node.js).
Users can sign up, log in, add books, and post reviews with ratings.

---

## 🚀 Features

* User authentication (JWT & bcrypt)
* Add, edit, and delete books
* Review system with ratings and comments
* Pagination for book listings
* Bootstrap frontend with protected routes
* Deployed and Live
---

## 🛠️ Tech Stack

* **Frontend:** CSS, Bootstrap, HTML, Javascript
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Auth:** JWT, bcrypt

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
