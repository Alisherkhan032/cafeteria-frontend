import React, { useEffect, useState } from "react";
import {
  selectAllMerchants,
  setMerchants,
} from "@/slices/authSlice";
import {
  setCounter,
  selectCounters,
  addCounter,
  updateCounter,
  removeCounter,
} from "@/slices/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { CounterSkeleton } from "@/utils/skeletonConfig";
import { Pencil, PlusCircle, Trash } from "lucide-react";
import EditCounterModal from "@/components/EditCounterModal";
import { DEFAULT_IMG_PATH } from "@/utils/constants";
import CreateCounterModal from "@/components/CreateCounterModal";
import { toast, Toaster } from "react-hot-toast";
import NavbarLayout from "./NavbarLayout";
import { makeApiCall } from "@/services/makeApiCall";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

const ManageCounter = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const allCounters = useSelector(selectCounters);
  const merchants = useSelector(selectAllMerchants);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [counterToDelete, setCounterToDelete] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch counters data
      const countersData = await makeApiCall("get", "/counters");
      dispatch(setCounter(countersData.counters));

      // Fetch merchants data
      const merchantsData = await makeApiCall("get", "/users?role=merchant");
      dispatch(setMerchants(merchantsData.users));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (counter) => {
    setSelectedCounter(counter);
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedCounter) => {
    handleEditCounter(updatedCounter);
    setIsEditModalOpen(false);
  };

  const handleCreateCounter = async (counterData) => {
    try {
      setLoading(true);
      const dataToCreate = {
        ...counterData,
        merchant: counterData.merchants,
      };
      delete dataToCreate.merchants;

      const responseData = await makeApiCall("post", "/counters", dataToCreate);
      console.log("responseData of create counter", responseData);
      const newCounter = responseData.counter;
      dispatch(addCounter(newCounter));
      toast.success("Counter created successfully");
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating counter:", error);
      toast.error(error.response?.data?.message || "Failed to create counter");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCounter = async (updatedData) => {
    try {
      setLoading(true);

      const dataToUpdate = {
        ...updatedData,
        merchant: updatedData.merchants,
      };
      delete dataToUpdate.merchants;
      
      const responseData = await makeApiCall(
        "put",
        `/counters/${updatedData.id}`,
        dataToUpdate
      );

      const updatedCounter = responseData.counter;
      dispatch(updateCounter(updatedCounter));
      toast.success("Counter updated successfully");
    } catch (error) {
      console.error("Error updating counter:", error);
      toast.error(error.response?.data?.message || "Failed to update counter");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (counter, e) => {
    e.stopPropagation();
    setCounterToDelete(counter);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await makeApiCall("delete", `/counters/${counterToDelete._id}`);
      toast.success("Counter deleted successfully");
      dispatch(removeCounter(counterToDelete._id));
    } catch (error) {
      console.error("Error deleting counter:", error);
      toast.error(error.response?.data?.message || "Failed to delete counter");
    } finally {
      setLoading(false);
      setShowDeleteDialog(false);
      setCounterToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="px-20 min-h-screen py-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <div className="">
          {Array.from(new Array(3)).map((_, index) => (
            <CounterSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="px-20 min-h-screen py-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Toaster position="top-right" />
        {allCounters && allCounters.length > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Counters</h2>
              </div>
              <button
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl
                flex items-center gap-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                shadow-lg shadow-purple-600/20"
                disabled={loading}
                onClick={() => setIsCreateModalOpen(true)}
              >
                <PlusCircle className="h-5 w-5" />
                Add Counter
              </button>
            </div>
            {allCounters.map((counter) => (
              <div
                key={counter._id}
                className="relative flex items-center bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 
                hover:border-purple-500/50 transition-all group duration-300 cursor-pointer p-4"
              >
                <div className="w-24 h-24 flex-shrink-0 relative">
                  <img
                    src={counter.image || DEFAULT_IMG_PATH}
                    alt={counter.name}
                    className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent rounded-lg" />
                </div>

                <div className="ml-4 flex-1">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                    {counter.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {counter.merchant.map((merchant, index) => (
                      <span
                        key={index}
                        className="bg-gray-900/60 backdrop-blur-sm px-2 py-1 rounded-lg text-sm text-gray-200"
                      >
                        {merchant.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-200 text-sm line-clamp-2">
                    {counter.description}
                  </p>
                </div>

                <div className="self-start flex gap-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(counter);
                    }}
                    className="bg-gray-900/60 backdrop-blur-sm p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Pencil className="h-4 w-4 text-white" />
                  </button>

                  <button
                    onClick={(e) => handleDeleteClick(counter, e)}
                    className="bg-gray-900/60 backdrop-blur-sm p-2 rounded-lg hover:bg-red-900 transition-colors cursor-pointer"
                  >
                    <Trash className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-gray-500 text-lg">
              No merchant Counters available.
            </p>
          </div>
        )}
      </div>

      {selectedCounter && (
        <EditCounterModal
          counter={selectedCounter}
          isOpen={isEditModalOpen}
          merchants={merchants}
          onSave={handleSave}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {merchants && (
        <CreateCounterModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleCreateCounter}
          merchants={merchants}
        />
      )}

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#1e2939",
            color: "#FFFFFF",
            border: "1px solid #333",
          },
        }}
      >
        <DialogTitle>Delete Counter</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{counterToDelete?.name}"? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowDeleteDialog(false)} 
            color="secondary"
          >
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

export default function Wrapper() {
  return (
    <NavbarLayout>
      <ManageCounter />
    </NavbarLayout>
  );
}