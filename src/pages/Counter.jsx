import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDishes,
  dishesInCounter,
  selectloadingState,
  setLoading,
  selectCurrentCounter,
  setCurrentCounter
} from "@/slices/counterSlice";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "@/utils/apiConfigs";
import { Store, ChefHat } from 'lucide-react';
import axios from "axios";
import DishList from "@/components/DishList";

const CounterSkeleton = () => (
  <div className="w-full mb-6 animate-pulse">
    <div className="h-48 bg-gray-800/50 rounded-lg mb-4"></div>
    <div className="h-4 bg-gray-800/50 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-800/50 rounded w-1/2"></div>
  </div>
);

const Counter = () => {
  const dispatch = useDispatch();
  const dishes = useSelector(dishesInCounter);
  const loading = useSelector(selectloadingState);
  const currentCounter = useSelector(selectCurrentCounter);
  const counterName = currentCounter?.name;
  const { counterId } = useParams();

  const fetchDishes = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `${API_BASE_URL}/dishes/counter/${counterId}`
      );
      const { dishes } = response.data;
      dispatch(setDishes(dishes));
    } catch (error) {
      console.error("Error fetching dishes:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  const fetchCounter = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${API_BASE_URL}/counters/${counterId}`);
      const currentCounter = response.data;
      dispatch(setCurrentCounter(currentCounter));
    } catch (error) {
      console.error("Error fetching counter:", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  useEffect(() => {
    fetchDishes();
    fetchCounter();
  
    return () => {
      dispatch(setDishes([]));
      dispatch(setCurrentCounter(null));
    };
  }, [counterId]);

  return (
    <div className="min-h-screen px-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from(new Array(6)).map((_, index) => (
              <CounterSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="text-center mb-12 -mt-10">
              <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-full mb-4">
                <Store className="h-8 w-8 text-purple-500" />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">
                {counterName}
              </h1>
              <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full"></div>
            </div>

            {dishes && dishes.length > 0 ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-3xl"></div>
                <div className="relative">
                  <DishList dishes={dishes} counterId={counterId} />
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                <ChefHat className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">
                  No dishes available at this counter yet.
                </p>
                <p className="text-gray-500 mt-2">
                  Please check back later for updates.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Counter;