import React from "react";

const DishList = ({ dishes }) => {
  return (
    <ul className="flex flex-col gap-6">
      {dishes.map((dish) => (
        <li
        key={dish._id}
        className="p-6 bg-white shadow-lg rounded-3xl border hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
      >
        <div className="flex gap-6">
          {/* Image */}
          <img
            src={`/images/${dish.image}`} // Adjust this path based on your project structure
            alt={dish.name}
            className="w-32 h-32 object-cover rounded-xl"
          />
      
          <div className="flex-1">
            <h3 className="text-3xl font-semibold mb-2 text-gray-800">
              {dish.name}
            </h3>
            <p className="text-lg text-gray-600 mb-2">{dish.description}</p>
            <p className="text-xl font-bold text-gray-900 mb-2">₹{dish.price}</p>
            <p className="text-sm text-gray-500 mb-1">{dish.category}</p>
            <p
              className={`text-sm ${
                dish.inStock ? "text-green-500" : "text-red-500"
              }`}
            >
              {dish.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
      
          {/* Add to Cart Button */}
          <div className="flex items-center">
            <button
              className="ml-auto px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => handleAddToCart(dish)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </li>
      
      ))}
    </ul>
  );
};

export default DishList;
