import React, { useEffect } from "react";
import {
  setLoading,
  selectloadingState,
  setCurrentCounter,
} from "@/slices/counterSlice";
import {
  selectCurrentUser,
  setMerchantCounters,
  selectMerchantCounters,
} from "@/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarLayout from "@/components/NavbarLayout";
import { makeApiCall } from "@/services/makeApiCall";
import { CounterSkeleton } from "@/utils/skeletonConfig";
import { DEFAULT_IMG_PATH } from "@/utils/constants";
import Breadcrumb from "@/components/Breadcrumb";

const MerchantPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectloadingState);
  const merchant = useSelector(selectCurrentUser);
  const merchantCounters = useSelector(selectMerchantCounters);

  const breadcrumbItems = [
    {
      label: "Home",
      path: "/",
    },
    // {
    //   label: "Counters",
    //   path: "/home",
    // },
    {
      label: "Merchant Panel",
      path: "/merchant",
    },
    
  ];
  
  useEffect(() => {
    const fetchCounters = async () => {
      if (!merchant?._id) return;
      
      try {
        dispatch(setLoading(true));
        const responseData = await makeApiCall('get', `/users/counters/merchant/${merchant._id}`);
        console.log("responseData in merchant panel", responseData);
        const counters = responseData.counters;
        dispatch(setMerchantCounters(counters));
      } catch (error) {
        console.log("Error fetching counters", error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCounters();
  }, [merchant?._id, dispatch]); // Added dispatch to dependencies

  const handleCounterClick = (counter) => {
    dispatch(setCurrentCounter(counter));
    navigate(`/counter/${counter._id}`);
  };

  return (
    <>
      {/* Main content container - Adjusted padding for mobile */}
      <div className="min-h-screen px-2 sm:px-6 md:px-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <Breadcrumb items={breadcrumbItems} />
        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {Array.from(new Array(6)).map((_, index) => (
              <CounterSkeleton key={index} />
            ))}
          </div>
        ) : merchantCounters && merchantCounters.length > 0 ? (
          <div className="space-y-4">
            {merchantCounters.map((counter) => (
              <div
                key={counter._id}
                onClick={() => handleCounterClick(counter)}
                className="relative flex flex-col sm:flex-row items-start sm:items-center bg-gray-800/50 backdrop-blur-sm 
                rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all 
                group duration-300 cursor-pointer p-4"
              >
                {/* Image Section - Centered on mobile */}
                <div className="w-full sm:w-24 h-48 sm:h-24 flex-shrink-0 relative mb-4 sm:mb-0">
                  <img
                    src={counter.image || DEFAULT_IMG_PATH}
                    alt={counter.name}
                    className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent rounded-lg" />
                </div>

                {/* Content Section */}
                <div className="sm:ml-4 flex-1 w-full">
                  <h3 className="text-xl font-bold text-white mb-2 sm:mb-1 group-hover:text-purple-400 transition-colors">
                    {counter.name}
                  </h3>
                  
                  {/* Merchant tags - Improved wrapping for mobile */}
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-2">
                    {counter.merchant.map((merchant, index) => (
                      <span
                        key={index}
                        className="bg-gray-900/60 backdrop-blur-sm px-2 py-1 rounded-lg text-sm text-gray-200 
                        inline-block"
                      >
                        {merchant.name}
                      </span>
                    ))}
                  </div>
                  
                  {/* Description - Adjusted line clamp for better mobile readability */}
                  <p className="text-gray-200 text-sm line-clamp-3 sm:line-clamp-2">
                    {counter.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-6 sm:mt-10">
            <p className="text-gray-500 text-lg">
              No merchant Counters available.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default function Wrapper() {
  return (
    <NavbarLayout>
      <MerchantPanel />
    </NavbarLayout>
  );
}