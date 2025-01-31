import React, { useEffect, useState } from "react";
import {
  setLoading,
  selectloadingState,
  selectAllMerchants,
  setMerchants,
  updateMerchantCounter,
} from "@/slices/authSlice";
import {
  setCounter,
  selectCounters,
  addCounter,
  updateCounter,
} from "@/slices/counterSlice";
import { API_BASE_URL } from "@/utils/apiConfigs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CounterSkeleton } from "@/utils/skeletonConfig";
import { Pencil, PlusCircle, Trash } from "lucide-react";
import EditCounterModal from "@/components/EditCounterModal";
import { useNavigate } from "react-router-dom";
import { DEFAULT_IMG_PATH } from "@/utils/constants";
import CreateCounterModal from "@/components/CreateCounterModal";
import { toast, Toaster } from 'react-hot-toast';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectloadingState);
  const allCounters = useSelector(selectCounters);
  const merchants = useSelector(selectAllMerchants);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      dispatch(setLoading(true));

      // Use Promise.all to fetch data concurrently
      const [countersResponse, merchantsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/counters`),
        axios.get(`${API_BASE_URL}/users?role=merchant`),
      ]);

      // Update state with fetched data
      dispatch(setCounter(countersResponse.data.counters));
      dispatch(setMerchants(merchantsResponse.data.users));
    } catch (error) {
      console.error("Error fetching data:", error);
      // You might want to add error handling here, like showing a toast notification
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (counter) => {
    setSelectedCounter(counter); // Set the selected counter
    setIsEditModalOpen(true); // Open the modal
  };

  const handleSave = (updatedCounter) => {
    handleEditCounter(updatedCounter); // Save the updated counter
    setIsEditModalOpen(false); // Close the modal
  };

  const handleCreateCounter = async (counterData) => {
    try {
      dispatch(setLoading(true));
      const dataToCreate = {
        ...counterData,
        merchant: counterData.merchants,
      };
      delete dataToCreate.merchants;
  
      const response = await axios.post(
        `${API_BASE_URL}/counters`,
        dataToCreate
      );
  
      const newCounter = response.data.counter;
      dispatch(addCounter(newCounter)); // Add to local state immediately
      setIsCreateModalOpen(false);
      toast.success('Counter created successfully');
  
    } catch (error) {
      console.error("Error creating counter:", error);
      toast.error(error.response?.data?.message || 'Failed to create counter');
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  // Modify handleEditCounter function
  const handleEditCounter = async (updatedData) => {
    try {
      dispatch(setLoading(true));
  
      const dataToUpdate = {
        ...updatedData,
        merchant: updatedData.merchants,
      };
      delete dataToUpdate.merchants;
  
      const response = await axios.put(
        `${API_BASE_URL}/counters/${updatedData.id}`,
        dataToUpdate
      );
  
      const updatedCounter = response.data.counter;
      dispatch(updateCounter(updatedCounter)); // Update local state immediately
      toast.success('Counter updated successfully');
  
    } catch (error) {
      console.error("Error updating counter:", error);
      toast.error(error.response?.data?.message || 'Failed to update counter');
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  // Modify handleDeleteClick function
  const handleDeleteClick = async (counter) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(`${API_BASE_URL}/counters/${counter.id}`);
      
      // Remove from local state immediately
      dispatch(removeCounter(counter._id)); // You'll need to add this action
      toast.success('Counter deleted successfully');
  
    } catch (error) {
      console.error("Error deleting counter:", error);
      toast.error(error.response?.data?.message || 'Failed to delete counter');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
    <Toaster position="top-right" />
      {/* Main content container */}
      <div className="px-20 py-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        {loading ? (
          <div className="">
            {Array.from(new Array(6)).map((_, index) => (
              <CounterSkeleton key={index} />
            ))}
          </div>
        ) : allCounters && allCounters.length > 0 ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center  mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Counters</h2>
                {/* <p className="text-gray-400">Explore </p> */}
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
                {/* Image Section */}
                <div className="w-24 h-24 flex-shrink-0 relative">
                  <img
                    src={counter.image || DEFAULT_IMG_PATH}
                    alt={counter.name}
                    className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent rounded-lg" />
                </div>

                {/* Content Section */}
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

                {/* Edit Button */}
                <div className="self-start flex gap-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(counter);
                    }}
                    className="bg-gray-900/60 backdrop-blur-sm p-2 rounded-lg hover:bg-gray-800 transition-colors "
                  >
                    <Pencil className="h-4 w-4 text-white" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(counter);
                    }}
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

      {/* Modal Portal */}
      {selectedCounter && (
        <EditCounterModal
          counter={selectedCounter}
          isOpen={isEditModalOpen}
          merchants={merchants}
          onSave={handleSave}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      <CreateCounterModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateCounter}
        merchants={merchants}
      />
    </>
  );
};

export default AdminPanel;
