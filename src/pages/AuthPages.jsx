import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentUser,
  setLoading,
  selectloadingState,
  setCurrentUser,
} from "@/slices/authSlice";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { AUTH_BASE_URL, API_BASE_URL } from "@/utils/apiConfigs";
import { makeApiCall } from "@/services/makeApiCall";
import { setCart } from "@/slices/cartSlice";
import { ArrowLeft, Eye, EyeOff, UtensilsCrossed } from "lucide-react";
import { ROLES } from "@/utils/constants";

export function Auth() {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

export function CustomerRoute() {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  // If user is not logged in, redirect to login.
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Allow access if user is either a customer or an admin
  if (user.role !== ROLES.CUSTOMER && user.role !== ROLES.ADMIN) {
    return <Navigate to="/" replace />;
  }
  // User is authenticated and is a customer. Render child routes.
  return <Outlet />;
}

export function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const nextPage = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem("token", token);
      const responseData = await makeApiCall("get", "/cart");
      dispatch(setCurrentUser(responseData.user));
      dispatch(setCart(responseData.cart));
      navigate(nextPage, { replace: true });
    } catch (err) {
      console.log(err);
      const errMessage = err.response?.data?.message || "Something went wrong";
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Link to="/">
        <div className="flex items-center space-x-1  ml-2 mb-8 cursor-pointer">
          <ArrowLeft className="text-yellow-400" size={28} />
          <div className="text-white text-2xl font-bold whitespace-nowrap">
            Go back
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-3 justify-center mb-4">
        <UtensilsCrossed className="text-yellow-400" size={28} />
        <div className="text-white text-2xl font-bold whitespace-nowrap">
          Urban-Eats
        </div>
      </div>
      <div className="max-w-md mx-auto px-4">
        <form
          onSubmit={handleLogin}
          className="bg-gray-900/60 rounded-lg p-8 border-2 border-gray-700"
        >
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Login
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative w-full h-full px-2 py-1   flex items-center bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full py-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-2"
                >
                  {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    if (password !== password2) {
      setError("Password mismatch!!");
      return;
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        name: username,
        email,
        password,
      });
      console.log(response.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
      const errMessage = err.response?.data?.message || "Something went wrong";
      setError(errMessage);
    } finally {
      setLoading(true);
    }
  };

  return (
    <div className="min-h-screen py-4 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Link to="/">
        <div className="flex items-center space-x-1  mb-8 ml-2 cursor-pointer">
          <ArrowLeft className="text-yellow-400" size={28} />
          <div className="text-white text-2xl font-bold whitespace-nowrap">
            Go back
          </div>
        </div>
      </Link>
      <div className="flex items-center space-x-3 justify-center mb-4">
        <UtensilsCrossed className="text-yellow-400" size={28} />
        <div className="text-white text-2xl font-bold whitespace-nowrap">
          Urban-Eats
        </div>
      </div>
      <div className="max-w-md mx-auto px-4">
        <form
          onSubmit={handleRegister}
          className="bg-gray-900/60 rounded-lg p-8 border-2 border-gray-700"
        >
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Register
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative w-full h-full px-2 py-1   flex items-center bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full py-2 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute right-2"
                >
                  {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/50 rounded text-green-400">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
