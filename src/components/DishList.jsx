import React, { useState } from "react";
import { selectItemsFromCart } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/slices/cartSlice";
import axios from "axios";
import { API_BASE_URL } from "@/utils/apiConfigs";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import EditDishModal from "./EditDishModal ";

const DishList = ({ dishes }) => {
  const dispatch = useDispatch();
  const totalItemsInCart = useSelector(selectItemsFromCart);
  const [isLoading, setIsLoading] = useState(false); // Track global loading state

  const isItemInCart = (id) => {
    return totalItemsInCart.some((item) => item.dish._id === id);
  };

  const handleAddToCart = async (dish) => {
    try {
      setIsLoading(true); // Start loading
      const dishResponse = await axios.post(`${API_BASE_URL}/cart`, { dish });
      const updatedCart = dishResponse.data.cart;
      dispatch(setCart(updatedCart));
    } catch (error) {
      console.error("Failed to add item to cart", error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="relative">
      {/* Full-screen overlay when loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      )}

      {/* Content */}
      <ul className={`flex flex-col gap-6 ${isLoading ? "opacity-50" : ""}`}>
        {dishes.map((dish) => (
          <li
            key={dish._id}
            className="p-6 bg-white shadow-lg rounded-3xl border hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex gap-6">
              <img
                src={`/images/${dish.image}`}
                alt={dish.name}
                className="w-32 h-32 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h3 className="text-3xl font-semibold mb-2 text-gray-800">
                  {dish.name}
                </h3>
                <p className="text-lg text-gray-600 mb-2">{dish.description}</p>
                <p className="text-xl font-bold text-gray-900 mb-2">
                  ₹{dish.price}
                </p>
                <p className="text-sm text-gray-500 mb-1">{dish.category}</p>
                <p
                  className={`text-sm ${
                    dish.inStock ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {dish.inStock ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              <div className="flex items-center gap-x-2">
                {isItemInCart(dish._id) ? (
                  <span className="px-4 py-2 bg-green-400 text-white cursor-pointer font-semibold rounded-lg">
                    <Link to="/cart">Go to Cart</Link>
                  </span>
                ) : (
                  <button
                    onClick={() => handleAddToCart(dish)}
                    className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg ${
                      isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={isLoading || !dish.inStock}
                  >
                    Add to Cart
                  </button>
                )}
                <div className="cursor-pointer">
                  <i className="fi fi-rr-edit"></i>
                </div>
                <div className="cursor-pointer">
                  <i className="fi fi-rr-trash text-red-600"></i>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishList;
