# 📝 BlogSpot – A Full-Stack Blogging Platform

BlogSpot is a modern blogging platform where users can sign up, sign in, and create posts. It features secure authentication, admin controls, and Google OAuth integration for quick signup.

## 🚀 Features

- ✍️ User signup & login with form validation
- 🔐 Google Sign-In using Firebase
- 🧑‍💼 Admin dashboard for managing users/posts
- 💡 Toast notifications for feedback
- 🎨 Responsive and modern UI with TailwindCSS
- 🗄️ Backend (Express.js + MongoDB) integration

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- TailwindCSS
- React Hook Form
- React Router DOM
- React Toastify
- Firebase (Google Auth)

**Backend (in development or already integrated):**
- Node.js + Express
- MongoDB (Mongoose)

## 📸 Screenshots

| Signup Page | Google Auth | Dashboard |
|-------------|-------------|-----------|
| ![signup](./screens/signup.png) | ![google](./screens/google-auth.png) | ![dashboard](./screens/dashboard.png) |

## 🔧 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/blogspot.git
cd blogspot

2. Install Dependencies
cd client
npm install
cd api
npm install

3. Setup Firebase
Create a firebase.js file in src/ and configure:
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  // etc...
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { signInWithPopup };

4. Start Server and Frontend
cd api
npm start
cd client
npm run dev

Folder Structure
src/
├── assets/
├── components/
├── pages/
│   ├── Signup.jsx
│   ├── Signin.jsx
│   └── Dashboard.jsx
├── firebase.js
└── App.jsx
