import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Counter from "./pages/Counter";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Admin from "./pages/AdminPanel";
import Merchant from "./pages/MerchantPanel";
import Profile from "./pages/Profile";
import { Auth, Login, Register } from "./pages/AuthPages";
import Navbar from "./components/Navbar";
import {
  setCurrentUser,
  setLoading,
  selectloadingState,
} from "./slices/authSlice";
import { setCart } from "./slices/cartSlice";
import axios from "axios";
import { API_BASE_URL } from "./utils/apiConfigs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import Users from "./pages/ManageUsers";
import ManageCounter from "./components/ManageCounter";
import { makeApiCall } from "./services/makeApiCall";
import { selectCurrentCounter } from "./slices/counterSlice";
import { CounterSkeleton } from "./utils/skeletonConfig";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentCounter);
  const loading = useSelector(selectloadingState);

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));
      const responseData = await makeApiCall("get", "/cart");
      dispatch(setCurrentUser(responseData.user));
      dispatch(setCart(responseData.cart));
    } catch (error) {
      console.log(
        "Error fetching user",
        error.response?.data?.message || error.message
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!user) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <CounterSkeleton />
        <CounterSkeleton />
        <CounterSkeleton />
      </div>
    );
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LandingPage />} />
          <Route element={<Auth />}>  
            <Route path="/home" element={<Home />} />
            <Route path="/counter/:counterId" element={<Counter />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/merchant" element={<Merchant />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manage-users" element={<Users />} />
            <Route path="/manage-counters" element={<ManageCounter />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
