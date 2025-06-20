import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, provider, signInWithPopup } from "../firebase";
import Blog from '../assets/Blogspot.png';
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(signInStart());
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", data, {
        withCredentials: true,
      });
      dispatch(signInSuccess(res.data));
      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.response?.data || "Login failed";
      dispatch(signInFailure(errorMsg));
      toast.error(errorMsg);
    }
  };

  const handleGoogleLogin = async () => {
    dispatch(signInStart());
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };
      dispatch(signInSuccess(userInfo));
      toast.success(`Welcome back, ${user.displayName}`);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      dispatch(signInFailure("Google sign-in failed"));
      toast.error("Google sign-in failed");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4">
        {/* Your original heading and image positioning */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
          WELCOME BACK TO BLOGSPOT
        </h1>
        <img
          src={Blog}
          alt="BlogSpot"
          className="h-[150px] mb-[-100px] relative left-[-390px]"
        />

        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mt-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          {/* Redux error message */}
          {error && (
            <p className="text-center text-red-500 text-sm mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  trigger("email");
                }}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
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
                  trigger("password");
                }}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md text-white ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition duration-200`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-2">
            <hr className="flex-grow border-gray-300" />
            <span className="text-gray-400 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full border py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-200"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            {loading ? "Processing..." : "Login with Google"}
          </button>

          <p className="mt-4 text-center text-sm">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-blue-600 underline cursor-pointer">
                Sign up here
              </span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
