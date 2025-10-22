# 🛍️ Shopping-Ecommerce

A modern full-stack **e-commerce web application** built with **Next.js**, **TypeScript**, and **MongoDB**, featuring product listings, authentication, shopping cart, payments, and admin management.

---

## 🚀 Features

- 🧑‍💻 **User Authentication** – Register, login, logout, and password reset
- 🛒 **Product Management** – List, Browse, search, and filter products
- 🛍️ **Shopping Cart** – Add/remove items and proceed to checkout
- 💳 **Payment Integration** – Secure checkout via **Flutterwave**
- ⚙️ **Admin Panel** – Manage products, orders, and users
- 📱 **Responsive UI** – Optimized for all screen sizes
- 🔐 **Secure Auth** – JWT/Session-based authentication using **NextAuth.js**
- 🧩 **Scalable Architecture** – Built with modern best practices
- 🖌️ **UI/UX** – Styled with **Tailwind CSS**

---

## 🧰 Tech Stack

| Category           | Technology                                       |
| ------------------ | ------------------------------------------------ |
| **Framework**      | [Next.js 14](https://nextjs.org/)                |
| **Language**       | [TypeScript](https://www.typescriptlang.org/)    |
| **Database**       | [MongoDB](https://www.mongodb.com/) via Mongoose |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/)         |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/)         |
| **Payments**       | [Flutterwave API](https://flutterwave.com/)      |
| **Deployment**     | [Vercel](https://vercel.com/)                    |

---

## 🖥️ Live Demo

🔗 [https://shopping-ecommerce-gamma.vercel.app](https://shopping-ecommerce-gamma.vercel.app)

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/josephDev123/shopping-ecommerce.git
cd shopping-ecommerce
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

- Create a .env file in the project root and add:
- MONGODB_URI=your_mongodb_uri
- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=your_secret_key
- OAUTH_CLIENT_ID=your_client_id
- OAUTH_CLIENT_SECRET=your_client_secret
- FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
- FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key

### 4️⃣ Run the development server

```Bash
  npm run dev
```

Then open http://localhost:3000 in your browser.

#### 🧭 Usage Guide

Register or log in to your account.

Browse available products by category or search.

Add items to your cart and review before checkout.

Complete the payment securely via Flutterwave.

(Admin users) Access the dashboard to manage products and orders.

#### 🧱 Deployment

Build and start the app for production:

```bash
npm run build
npm start
```

#### 👨‍💻 Author

Joseph Uzuegbu
🔗 GitHub Profile(https://github.com/josephDev123)

💼 Software Engineer | React & Node.js Developer
