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
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import axios from "axios";
import DishList from "@/components/DishList";

const CounterSkeleton = () => (
  <Box sx={{ width: "100%", marginBottom: 2 }}>
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "60%" }} />
      <Skeleton variant="rectangular" width="100%" height={120} />
    </Stack>
  </Box>
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
      dispatch(setLoading(true)); // Start loading
      const response = await axios.get(
        `${API_BASE_URL}/dishes/counter/${counterId}`
      );
      const { dishes } = response.data;
      dispatch(setDishes(dishes));
    } catch (error) {
      console.error("Error fetching dishes:", error.message);
    } finally {
      dispatch(setLoading(false)); // End loading
    }
  };
  
  const fetchCounter = async () => {
    try {
      dispatch(setLoading(true)); // Start loading
      const response = await axios.get(`${API_BASE_URL}/counters/${counterId}`);
      const currentCounter = response.data;
      dispatch(setCurrentCounter(currentCounter));
    } catch (error) {
      console.error("Error fetching counter:", error.message);
    } finally {
      dispatch(setLoading(false)); // End loading
    }
  };
  
  useEffect(() => {
    fetchDishes();
    fetchCounter();
  
    return () => {
      // Cleanup on unmount
      dispatch(setDishes([]));
      dispatch(setCurrentCounter(null));
    };
  }, [counterId]);
  

  return (
    <Box sx={{ padding: 2 }}>
  {loading ? (
    <div className="">
      {Array.from(new Array(6)).map((_, index) => (
        <CounterSkeleton key={index} />
      ))}
    </div>
  ) : (
    <>
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Counter: {counterName}
      </h1>
      {dishes && dishes.length > 0 ? (
        <DishList dishes={dishes} />
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">No Dishes available.</p>
        </div>
      )}
    </>
  )}
</Box>

  );
};

export default Counter;
