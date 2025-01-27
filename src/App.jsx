import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Counter from "./pages/Counter";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Merchant from "./pages/Merchant";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import { setCurrentUser, setLoading } from "./slices/authSlice";
import { setCart } from "./slices/cartSlice";
import axios from "axios";
import { API_BASE_URL } from "./utils/apiConfigs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LandingPage from "./pages/LandingPage";

function App() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.auth.currentUser);

  const fetchCart = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${API_BASE_URL}/cart`);
  
      const {user, cart} = response.data;
      
      dispatch(setCurrentUser(user));
      dispatch(setCart(cart));

    } catch (error) {
      console.log("Error fetching user", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/counter/:counterId" element={<Counter />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/merchant" element={<Merchant />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
