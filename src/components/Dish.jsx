import React from "react";
import { ShoppingCart, Edit2, Trash2 } from "lucide-react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Dish = ({
  dish,
  isLoading,
  isInCart,
  onAddToCart,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div
      className="bg-gray-800/50 relative backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 
  hover:border-purple-500/50 transition-all duration-300 group flex flex-col h-full"
    >
      <div className="aspect-video relative overflow-hidden flex-shrink-0">
        <img
          src={dish.image || "/api/placeholder/400/300"}
          alt={dish.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{dish.name}</h3>
            <p className="text-gray-400 text-sm line-clamp-2">
              {dish.description}
            </p>
          </div>
          <span className="text-lg font-bold text-purple-400">
            ₹{dish.price}
          </span>
        </div>

        {/* Buttons Section (Sticky to Bottom) */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => onEditClick(dish)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                disabled={isLoading}
              >
                <Edit2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDeleteClick(dish._id)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors"
                disabled={isLoading}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            {isInCart ? (
              <Link to="/cart" className="">
                {" "}
                <button
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-300
          ${
            isInCart
              ? "bg-green-600/20 hover:bg-green-700/20 text-green-400"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Go to Cart
                </button>
              </Link>
            ) : (
              <button
                onClick={() => onAddToCart(dish)}
                disabled={isLoading}
                className={` px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-300
        ${
          isInCart
            ? "bg-green-600/20 hover:bg-green-700/20 text-green-400"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dish;
