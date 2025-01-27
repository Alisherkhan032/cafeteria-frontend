import React, { useState } from "react";
import { selectItemsFromCart } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateDish, removeDish } from "@/slices/counterSlice";
import { setCart } from "@/slices/cartSlice";
import { PlusCircle, Loader2 } from 'lucide-react';
import axios from "axios";
import { API_BASE_URL } from "@/utils/apiConfigs";
import Dish from "./Dish";
import EditDishModal from "./EditDishModal ";

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
      <Loader2 className="h-6 w-6 text-purple-500 animate-spin" />
      <span className="text-gray-200">Processing...</span>
    </div>
  </div>
);

const DishList = ({ dishes }) => {
  const dispatch = useDispatch();
  const totalItemsInCart = useSelector(selectItemsFromCart);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isItemInCart = (id) => {
    return totalItemsInCart.some((item) => item.dish._id === id);
  };

  const handleAddToCart = async (dish) => {
    try {
      setIsLoading(true);
      const dishResponse = await axios.post(`${API_BASE_URL}/cart`, { dish });
      const updatedCart = dishResponse.data.cart;
      dispatch(setCart(updatedCart));
    } catch (error) {
      console.error("Failed to add item to cart", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleEditClose = () => {
    setIsModalOpen(false);
    setSelectedDish(null);
  };

  const handleEditSave = async (updatedDish) => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `${API_BASE_URL}/dishes/${updatedDish.id}`,
        updatedDish
      );
      const updatedDishFromServer = response.data.dish;
      dispatch(updateDish(updatedDishFromServer));
    } catch (error) {
      console.error("Failed to update dish", error);
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setSelectedDish(null);
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`${API_BASE_URL}/dishes/${id}`);
      const deletedDishFromServer = response.data.dish;
      dispatch(removeDish(deletedDishFromServer));
    } catch (error) {
      console.error("Failed to delete dish", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {isLoading && <LoadingOverlay />}
      
      <div className="flex justify-between items-center  mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Menu</h2>
          <p className="text-gray-400">Explore our delicious dishes</p>
        </div>
        <button
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl
            flex items-center gap-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed
            shadow-lg shadow-purple-600/20"
          disabled={isLoading}
        >
          <PlusCircle className="h-5 w-5" />
          Add Dish
        </button>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 
        ${isLoading ? "opacity-50" : ""} transition-opacity duration-200`}>
        {dishes.map((dish) => (
          <Dish
            key={dish._id}
            dish={dish}
            isLoading={isLoading}
            isInCart={isItemInCart(dish._id)}
            onAddToCart={handleAddToCart}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteDish}
          />
        ))}
      </div>

      {selectedDish && (
        <EditDishModal
          dish={selectedDish}
          onSave={handleEditSave}
          onClose={handleEditClose}
          isOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default DishList;