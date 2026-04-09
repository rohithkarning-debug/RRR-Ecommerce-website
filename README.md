RRR_Mart – Online Shopping Website

Overview

RRR_Mart is a modern **E-commerce web application** built using React.
It provides a smooth and user-friendly shopping experience where users can browse products, search items, add to cart, and complete purchases.

The main goal of this project is to create a **simple, attractive, and easy-to-use online shopping platform**.

---

Features

### 🏠 User Interface

* Clean and responsive design
* Dark/Light theme toggle 🌙☀️
* Easy navigation with categories

### 🔍 Product Browsing

* Browse products by categories
* Search functionality for quick access
* Product details page

### 🛒 Shopping Features

* Add to cart
* Update quantity
* Remove items
* View total price

### 🔐 Authentication

* User Signup & Login
* Token-based authentication (stored in localStorage)
* Logout functionality

### 💳 Checkout

* Checkout page
* Order success confirmation

---

## 🛠️ Technologies Used

* ⚛️ React.js
* 🌐 React Router
* 🎨 CSS (Custom styling)
* 🧠 Context API (State Management)
* 🔗 Node.js (Backend API – for authentication)

---

## 📁 Project Structure

```

react/
│
├── node_modules/              
│
├── public/
│   └── vite.svg              
│
├── server/                   
│   ├── controllers/          
│   ├── models/
│   │   └── User.js           
│   ├── routes/
│   │   └── auth.js           
│   └── index.js             
│
├── src/                     
│   ├── assets/               
│   │   ├── apple.png
│   │   ├── electronics.png
│   │   ├── bike.png
│   │   └── ...more images
│
│   ├── components/          
│   │   ├── Navbar.jsx
│   │   └── Productcard.jsx
│
│   ├── context/              
│   │   ├── AuthContext.jsx  
│   │   └── CartContext.jsx   
│
│   ├── data/                
│   │   └── products.js      
│
│   ├── pages/               
│   │   ├── Home.jsx
│   │   ├── Categories.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── search.jsx
│   │   └── OrderSuccess.jsx
│
│   ├── styles/
│   │   └── global.css        
│
│   ├── App.jsx               
│   └── main.jsx             
│
├── .gitignore               
├── eslint.config.js         
├── index.html               
├── package.json              
├── package-lock.json
├── vite.config.js            
└── README.md                
---

## ⚙️ How It Works

* Routing is handled using React Router → 
* Application is wrapped with Context Providers for global state → 
* Cart logic is managed using reducer pattern → 
* Authentication uses token stored in localStorage → 

---

## ▶️ How to Run the Project

### 🔹 1. Install dependencies

```bash
npm install
```

### 🔹 2. Start the project

```bash
npm run dev
```

OR (if configured):
```bash
npm start
```

---

## 🌐 Pages Available

* `/` → Home
* `/categories` → Categories
* `/category/:slug` → Product List
* `/product/:id` → Product Details
* `/cart` → Cart
* `/login` → Login
* `/signup` → Signup
* `/search` → Search
* `/checkout` → Checkout
* `/order-success` → Order Confirmation

---

## 🎯 Key Highlights

* Uses **Context API** for state management
* Implements **dynamic routing**
* Fully **responsive UI**
* Clean and modular code structure
* Real-world **E-commerce flow simulation**

---

## 🚀 Future Improvements

* 💾 Database integration (MongoDB / MySQL)
* 💳 Payment gateway (Razorpay / Stripe)
* 📦 Order history tracking
* 🔎 Advanced filters & sorting
* 📱 Mobile app version

---

## 👨‍💻 Authors

-> Rottela Haritej
->Rishit VNS
->Rohith Karning

---

## ⭐ Conclusion

This project demonstrates the implementation of a complete frontend E-commerce system with essential features like authentication, cart management, and routing, focusing on **user experience and simplicity**.
