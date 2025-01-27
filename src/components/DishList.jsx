import React, { useState } from "react";
import { selectItemsFromCart } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateDish, removeDish } from "@/slices/counterSlice";
import { setCart } from "@/slices/cartSlice";
import axios from "axios";
import { API_BASE_URL } from "@/utils/apiConfigs";
import CircularProgress from "@mui/material/CircularProgress";
import Dish from "./Dish";
import EditDishModal from "./EditDishModal ";

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
      {isLoading && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex items-center justify-center">
          <CircularProgress color="inherit" />
        </div>
      )}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700">
          Dishes
        </h2>
        <button
          className={`px-4 py-2 bg-cyan-600 cursor-pointer hover:bg-cyan-700 text-white font-semibold rounded-lg`}
          disabled={isLoading}
          
        >
          Add Dish
        </button>
      </div>
      <ul className={`flex flex-col gap-6 ${isLoading ? "opacity-50" : ""}`}>
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
      </ul>

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
