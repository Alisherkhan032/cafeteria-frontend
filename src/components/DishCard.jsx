import React, { useState } from "react";
import { ShoppingCart, Edit2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { DEFAULT_DISH_PATH } from "@/utils/constants";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/slices/authSlice";
import { ROLES } from "@/utils/constants";

const DishCard = ({
  dish,
  isLoading,
  isInCart,
  onAddToCart,
  onEditClick,
  onDeleteClick,
}) => {
  const isDishInStock = dish.inStock;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const user = useSelector(selectCurrentUser);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDeleteClick(dish._id);
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div
        className="bg-gray-800/50 relative backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 
  hover:border-purple-500/50 transition-all duration-300 group flex flex-col h-full"
      >
        <div className="aspect-video relative overflow-hidden flex-shrink-0">
          <img
            src={dish.image || DEFAULT_DISH_PATH}
            alt={dish.name}
            className="w-full h-full object-cover transform group-hover:scale-105  transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            {/* Ensure this flex child can shrink properly */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">{dish.name}</h3>
                {dish.category && (
                  <span
                    className={`inline-flex items-center justify-center rounded-full p-1 ${
                      dish.category === "veg"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {dish.category === "veg" ? (
                      <i className="fi fi-ss-leaf text-sm translate-y-[-1px]"></i>
                    ) : (
                      <i className="fi fi-ss-meat text-sm"></i>
                    )}
                  </span>
                )}
              </div>
              {/* Force breaking of long words */}
              <p className="break-words text-gray-400 text-sm line-clamp-2">
                {dish.description}
              </p>
            </div>
            {/* Prevent price from shrinking/moving */}
            <span className="flex-shrink-0 text-lg font-bold text-purple-400 ml-4">
              ₹{dish.price}
            </span>
          </div>

          {/* Buttons Section (Sticky to Bottom) */}
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between">
              {user.role == ROLES.MERCHANT && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onEditClick(dish)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-lg transition-colors"
                    disabled={isLoading}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              )}

              {!isDishInStock ? (
                <button
                  disabled
                  className="px-4 py-2 rounded-lg flex items-center gap-2 opacity-50 cursor-not-allowed bg-gray-600/20 text-gray-400 transition-all duration-300"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Out of Stock
                </button>
              ) : isInCart ? (
                user.role == ROLES.CUSTOMER && (
                  <Link to="/cart" className="">
                    <button
                      disabled={isLoading}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                        isInCart
                          ? "bg-green-600/20 hover:bg-green-700/20 text-green-400"
                          : "bg-purple-600 hover:bg-purple-700 text-white"
                      }`}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Go to Cart
                    </button>
                  </Link>
                )
              ) : (
                user.role == ROLES.CUSTOMER && (
                  <button
                    onClick={() => onAddToCart(dish)}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                      isInCart
                        ? "bg-green-600/20 hover:bg-green-700/20 text-green-400"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#1e2939", // Dark gray background
            color: "#FFFFFF", // White text
            border: "1px solid #333", // Border to match dark theme
          },
        }}
      >
        <DialogTitle>Delete Dish</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{dish.name}"? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DishCard;
