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
  HomeIcon,
  ShoppingCartIcon,
} from "lucide-react";
import NavbarLayout from "@/components/NavbarLayout";
import { makeApiCall } from "@/services/makeApiCall";
import { DEFAULT_DISH_PATH } from "@/utils/constants";
import Breadcrumb from "@/components/Breadcrumb";

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

  const breadcrumbItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Counters",
      path: "/home",
    },
    {
      label: "Cart",
      path: "/cart",
    },
  ];

  const handleRemoveItem = async (itemId) => {
    try {
      dispatch(setLoading(true));
      const responseData = await makeApiCall("delete", `/cart/${itemId}`);
      const updatedCart = responseData.cart;
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
      const responseData = await makeApiCall("patch", `/cart/${itemId}`, {
        increment: increment,
      });
      const updatedCart = responseData.cart;
      dispatch(setCart(updatedCart));
    } catch (error) {
      console.log("Error in updating quantity", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleClearCart = async () => {
    try {
      dispatch(setLoading(true));
      const responseData = await makeApiCall("delete", `/cart`);
      const updatedCart = responseData.cart;
      dispatch(setCart(updatedCart));
    } catch (error) {
      console.log("Error in clearing cart", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.dish.inStock) {
        return total + item.dish.price * item.quantity;
      }
      return total;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  // Only apply delivery fee if subtotal is greater than 0
  const deliveryFee = subtotal > 0 ? (subtotal > 499 ? 0 : 40) : 0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    scroll({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="min-h-screen px-2 sm:px-6 md:px-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="relative">
          {loading && <LoadingOverlay />}

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Your Cart
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Review and checkout your items
              </p>
              {!cartItems.length == 0 && (
                <button
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mt-3 cursor-pointer rounded-md transition bg-red-500 text-white hover:bg-red-600 text-sm sm:text-base"
                  onClick={handleClearCart}
                >
                  <Trash2 size={18} />
                  Clear Cart
                </button>
              )}
            </div>
            <button
              className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl
            flex items-center gap-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg shadow-purple-600/20 text-sm sm:text-base w-full sm:w-auto justify-center"
              disabled={loading || cartItems.length === 0}
            >
              <span>Checkout</span>
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="min-h-[300px] sm:min-h-[400px] bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 sm:p-12 text-center">
              <ShoppingBag className="h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                Add some delicious items to your cart
              </p>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 ${
                loading ? "opacity-50" : ""
              } transition-opacity duration-200`}
            >
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {cartItems.map(
                  (item) =>
                    item.dish && (
                      <div
                        key={item._id}
                        className={`bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 
                    hover:border-purple-500/50 transition-all duration-300 group ${
                      !item.dish.inStock ? "opacity-30 " : ""
                    }`}
                      >
                        <div className="p-3 sm:p-4 flex gap-3 sm:gap-4">
                          <div className="w-24 sm:w-32 h-20 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.dish.image || DEFAULT_DISH_PATH}
                              alt={item.dish.name}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                                  {item.dish.name}
                                </h3>
                                <p className="text-xs sm:text-sm text-gray-400 line-clamp-1">
                                  {item.dish.description}
                                </p>
                              </div>
                              <span className="text-base sm:text-lg font-bold text-purple-400 ml-4">
                                ₹{item.dish.price * item.quantity}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center gap-1 sm:gap-2 bg-gray-700/50 rounded-lg p-1">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(item._id, -1)
                                  }
                                  disabled={!item.dish.inStock || loading}
                                  className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {item.quantity === 1 ? (
                                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                  ) : (
                                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                                  )}
                                </button>
                                <span className="px-2 sm:px-3 font-semibold text-white text-sm sm:text-base">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(item._id, 1)
                                  }
                                  disabled={!item.dish.inStock || loading}
                                  className="p-1.5 sm:p-2 text-gray-400 hover:text-white hover:bg-gray-600/50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                                </button>
                              </div>

                              {!item.dish.inStock && (
                                <span className="text-base sm:text-lg font-medium opacity-100 text-red-400">
                                  Out of Stock
                                </span>
                              )}

                              <button
                                onClick={() => handleRemoveItem(item._id)}
                                disabled={loading}
                                className="text-xs sm:text-sm text-white hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-4 sm:p-6 sticky top-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex justify-between text-gray-400 text-sm sm:text-base">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm sm:text-base">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee}</span>
                    </div>
                    <div className="h-px bg-gray-700" />
                    <div className="flex justify-between text-white font-bold text-base sm:text-lg">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  {subtotal < 499 && (
                    <div className="mt-4 p-2 sm:p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <p className="text-xs sm:text-sm text-purple-400">
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

export default function Wrapper() {
  return (
    <NavbarLayout>
      <Cart />
    </NavbarLayout>
  );
}
