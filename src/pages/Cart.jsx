import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectItemsFromCart,
  setCart,
  setLoading,
  selectLoadingState,
} from "@/slices/cartSlice";
import axios from "axios";
import { API_BASE_URL } from "@/utils/apiConfigs";
import { CircularProgress } from "@mui/material";

const Cart = () => {
  const cartItems = useSelector(selectItemsFromCart);
  console.log(cartItems);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingState);

  const handleRemoveItem =async (itemId) => {
    try {
      dispatch(setLoading(true))
      const response = await axios.delete(`${API_BASE_URL}/cart/${itemId}`);
      const updatedCart = response.data.cart;
      dispatch(setCart(updatedCart));
    } catch (error) {
      console.log("Error in deleting item quantity", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateQuantity = async (itemId, increment) => {
    try {
      dispatch(setLoading(true))
      const response = await axios.patch(`${API_BASE_URL}/cart/${itemId}`, {
        increment: increment,
      });
      const updatedCart = response.data.cart;
      dispatch(setCart(updatedCart));
    } catch (error) {
      console.log("Error in updating quantity", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      )}

      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty</p>
      ) : (
        <ul className={`flex flex-col gap-6 ${loading ? "opacity-50" : ""}`}>
          {cartItems.map(
            (item) =>
              item.dish && (
                <li
                  key={item?._id}
                  className="p-6 bg-white shadow-lg rounded-3xl border hover:shadow-xl transition-shadow duration-300 mb-6"
                >
                  <div className="flex gap-6">
                    <img
                      src={item?.dish.image}
                      alt={item?.name}
                      className="w-32 h-32 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-3xl font-semibold mb-2 text-gray-800">
                        {item?.dish?.name}
                      </h3>
                      <p className="text-lg text-gray-600 mb-2">
                        {item?.dish?.description}
                      </p>
                      <p className="text-xl font-bold text-gray-900 mb-2">
                        ₹{item?.dish?.price}
                      </p>
                      <p className="text-sm text-gray-500 mb-1">
                        {item?.dish?.category}
                      </p>
                      <p
                        className={`text-sm ${
                          item?.dish?.inStock
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {item?.dish?.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleUpdateQuantity(item._id,-1)}
                        disabled={ loading}
                        className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 font-semibold rounded-lg mr-2"
                      >
                        {item.quantity === 1 ? <i class="fi fi-rr-trash"></i> : "-"}
                      </button>
                      <span className="text-xl font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item._id,1)}
                        className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-700 font-semibold rounded-lg ml-2"
                        disabled={loading}
                      >
                        +
                      </button>
                      <div
                        onClick={() => handleRemoveItem(item._id)}
                        className="ml-4 text-sm  cursor-pointer text-blue-500 font-semibold rounded-lg hover:underline hover:text-blue-700"
                        disabled={loading}
                      >
                        Remove 
                      </div>
                    </div>
                  </div>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default Cart;
