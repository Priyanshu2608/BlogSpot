import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider, signInWithPopup } from "../firebase"; // path to your firebase.js
import Blog from '../assets/Blogspot.png'

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signup", data);
      toast.success(res.data);
      reset();
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const backendMessage =
        err.response?.data?.message || err.response?.data || "Signup failed";
      toast.error(backendMessage);
    }
  };

  const handleGoogleSignup = async () => {
    try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    toast.success(`Welcome, ${user.displayName}`);
    // You can also send user.email or user.uid to your backend if needed
    setTimeout(() => navigate("/dashboard"), 1500);
  } catch (error) {
    toast.error("Google sign-in failed");
    console.error(error);
  }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">WELCOME TO BLOGSPOT</h1>
  <img src={Blog} alt="BlogSpot" className="h-[150px] mb-[-100px] relative left-[-330px]" />
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.username && (
                <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                onChange={(e) => {
                  register("email").onChange(e);
                  trigger("email"); // triggers live validation
                }}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                onChange={(e) => {
                  register("password").onChange(e);
                  trigger("password"); // triggers live validation
                }}
                
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 rounded-md text-white ${
                isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              } transition duration-200`}
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-200"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>

          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin">
              <span className="text-blue-600 underline cursor-pointer">Login here</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
