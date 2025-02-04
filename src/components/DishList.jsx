import React, { useState } from "react";
import { selectItemsFromCart } from "@/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateDish, removeDish, addDish } from "@/slices/counterSlice";
import { setCart } from "@/slices/cartSlice";
import { PlusCircle, Loader2, ChefHat } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Dish from "./DishCard";
import EditDishModal from "./EditDishModal ";
import CreateDishModal from "./CreateDishModal";
import { makeApiCall } from "@/services/makeApiCall";
import { selectCurrentUser } from "@/slices/authSlice";
import { ROLES } from "@/utils/constants";

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
      <Loader2 className="h-6 w-6 text-purple-500 animate-spin" />
      <span className="text-gray-200">Processing...</span>
    </div>
  </div>
);

const MenuHeader = ({ onAddDish, isLoading, user }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
    <div className="w-full sm:w-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
        Menu
      </h2>
      <p className="text-sm sm:text-base text-gray-400">
        Explore our delicious dishes
      </p>
    </div>

    {user && user.role === ROLES.MERCHANT && (
      <button
        className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-700 
        text-white font-semibold rounded-xl flex items-center justify-center sm:justify-start gap-2 
        transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed
        shadow-lg shadow-purple-600/20"
        disabled={isLoading}
        onClick={onAddDish}
      >
        <PlusCircle className="h-5 w-5" />
        <span>Add Dish</span>
      </button>
    )}
  </div>
);

const EmptyState = () => (
  <div className="text-center py-16 bg-gray-800/50 rounded-xl backdrop-blur-sm">
    <ChefHat className="h-16 w-16 text-gray-600 mx-auto mb-4" />
    <p className="text-gray-400 text-lg">
      No dishes available at this counter yet.
    </p>
    <p className="text-gray-500 mt-2">Please check back later for updates.</p>
  </div>
);

const DishList = ({ dishes, counterId }) => {
  console.log('counter id in dishList', counterId);
  const dispatch = useDispatch();
  const totalItemsInCart = useSelector(selectItemsFromCart);
  const user = useSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isItemInCart = (id) => {
    return totalItemsInCart.some((item) => item.dish._id === id);
  };

  const handleAddToCart = async (dish) => {
    try {
      setIsLoading(true);
      const dishResponse = await makeApiCall("post", "/cart", { dish });
      const updatedCart = dishResponse.cart;
      dispatch(setCart(updatedCart));
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Failed to add item to cart", error);
      toast.error("Failed to add item to cart");
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
    console.log('counter id in edit save', counterId);
    try {
      setIsLoading(true);
      const responseData = await makeApiCall(
        "patch",
        `/dishes/${updatedDish.id}`,
        updatedDish,
        { counterId: counterId } // Passing counterId as params
      );
      const updatedDishFromServer = responseData.dish;
      toast.success("Dish updated successfully");
      dispatch(updateDish(updatedDishFromServer));
    } catch (error) {
      console.error("Failed to update dish", error);
      toast.error("Failed to update dish");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
      setSelectedDish(null);
    }
  };

  const handleDeleteDish = async (id) => {
    try {
      setIsLoading(true);
      const responseData = await makeApiCall("delete", `/dishes/${id}`, null, {
        counterId: counterId,
      });
      const deletedDishFromServer = responseData.dish;
      toast.success("Dish deleted successfully");
      dispatch(removeDish(deletedDishFromServer));
    } catch (error) {
      console.error("Failed to delete dish", error);
      toast.error("Failed to delete dish");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDish = async (newDish) => {
    try {
      setIsLoading(true);
      const responseData = await makeApiCall(
        "post",
        "/dishes",
        {
          ...newDish,
          counter : counterId
        },
        { counterId: counterId }
      );
      const createdDish = responseData.dish;
      toast.success("Dish created successfully");
      dispatch(addDish(createdDish));
    } catch (error) {
      console.error("Error creating dish:", error);
      toast.error("Failed to create dish");
    } finally {
      setIsLoading(false);
      setShowCreateModal(false);
    }
  };

  return (
    <div className="relative">
      {isLoading && <LoadingOverlay />}
      <Toaster />
      <MenuHeader
        user={user}
        onAddDish={() => setShowCreateModal(true)}
        isLoading={isLoading}
      />

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-3xl"></div>
        <div className="relative px-2 md:px-6 lg:px-8">
          {" "}
          {/* reduced padding on small screens */}
          {dishes && dishes.length > 0 ? (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 
        ${
          isLoading ? "opacity-50" : ""
        } transition-opacity duration-200 w-full`}
            >
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
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {selectedDish && (
        <EditDishModal
          dish={selectedDish}
          onSave={handleEditSave}
          onClose={handleEditClose}
          isOpen={isModalOpen}
        />
      )}

      <CreateDishModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSave={handleCreateDish}
      />
    </div>
  );
};

export default DishList;
