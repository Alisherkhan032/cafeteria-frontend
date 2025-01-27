import React from 'react';
import { Link } from "react-router-dom";

const Dish = ({ 
  dish, 
  isLoading, 
  isInCart, 
  onAddToCart, 
  onEditClick, 
  onDeleteClick 
}) => {
  return (
    <li className="p-6 bg-white shadow-lg rounded-3xl border hover:shadow-xl transition-shadow duration-300">
      <div className="flex gap-6">
        <img
          src={dish.image}
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
          <p className={`text-sm ${dish.inStock ? "text-green-500" : "text-red-500"}`}>
            {dish.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <div className="flex items-center gap-x-2">
          {isInCart ? (
            <span className="px-4 py-2 bg-green-400 hover:bg-green-500 text-white cursor-pointer font-semibold rounded-lg">
              <Link to="/cart">Go to Cart</Link>
            </span>
          ) : (
            <button
              onClick={() => onAddToCart(dish)}
              className={`px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={isLoading || !dish.inStock}
            >
              Add to Cart
            </button>
          )}
          <div
            className="cursor-pointer"
            onClick={() => onEditClick(dish)}
          >
            <i className="fi fi-rr-edit"></i>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => onDeleteClick(dish._id)}
          >
            <i className="fi fi-rr-trash text-red-600"></i>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Dish;