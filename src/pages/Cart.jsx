import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectItemsFromCart,
  setCart,
  setLoading,
  selectLoadingState,
} from "@/slices/cartSlice";
import {
  Loader2,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/apiConfigs";

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs z-50 flex items-center justify-center">
    <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
      <Loader2 className="h-6 w-6 text-purple-500 animate-spin" />
      <span className="text-gray-200">Processing...</span>
    </div>
  </div>
);

const Cart = () => {
  const cartItems = useSelector(selectItemsFromCart);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingState);

  const handleRemoveItem = async (itemId) => {
    try {
      dispatch(setLoading(true));
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
      dispatch(setLoading(true));
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

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.dish.price * item.quantity,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal > 499 ? 0 : 40;
  const total = subtotal + deliveryFee;

  useEffect(()=>{
    scroll({
      top: 0,
      behavior: "smooth"
    })
  },[])

  return (
    <div className="min-h-screen px-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative">
          {loading && <LoadingOverlay />}

          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Your Cart</h2>
              <p className="text-gray-400">Review and checkout your items</p>
            </div>
            <button
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl
                flex items-center gap-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg shadow-purple-600/20"
              disabled={loading || cartItems.length === 0}
            >
              <span>Checkout</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="min-h-[400px] bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-12 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-400">
                Add some delicious items to your cart
              </p>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${
                loading ? "opacity-50" : ""
              } transition-opacity duration-200`}
            >
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map(
                  (item) =>
                    item.dish && (
                      <div
                        key={item._id}
                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 
                        hover:border-purple-500/50 transition-all duration-300 group"
                      >
                        <div className="p-4 flex gap-4">
                          <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={
                                item.dish.image || "/api/placeholder/400/300"
                              }
                              alt={item.dish.name}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-lg font-bold text-white mb-1">
                                  {item.dish.name}
                                </h3>
                                <p className="text-sm text-gray-400 line-clamp-1">
                                  {item.dish.description}
                                </p>
                              </div>
                              <span className="text-lg font-bold text-purple-400 ml-4">
                                {/* ₹{item.dish.price} */}
                                ₹{item.dish.price * item.quantity}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-2 bg-gray-700/50 rounded-lg p-1">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(item._id, -1)
                                  }
                                  disabled={loading}
                                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg transition-colors"
                                >
                                  {item.quantity === 1 ? (
                                    <Trash2 className="h-4 w-4" />
                                  ) : (
                                    <Minus className="h-4 w-4" />
                                  )}
                                </button>
                                <span className="px-3 font-semibold text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(item._id, 1)
                                  }
                                  disabled={loading}
                                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg transition-colors"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => handleRemoveItem(item._id)}
                                disabled={loading}
                                className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>

              <div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 sticky top-4">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="h-px bg-gray-700" />
                    <div className="flex justify-between text-white font-bold">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  {subtotal < 499 && (
                    <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <p className="text-sm text-purple-400">
                        Add items worth ₹{499 - subtotal} more for free delivery
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
