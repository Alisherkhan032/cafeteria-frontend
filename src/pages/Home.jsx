import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCounter, setLoading } from "@/slices/counterSlice";
import { API_BASE_URL } from "@/utils/apiConfigs";
import { selectCounters, setCurrentCounter } from "@/slices/counterSlice";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const CounterSkeleton = () => (
  <Box sx={{ width: "100%", marginBottom: 2 }}>
    <Stack spacing={1}>
      <Skeleton variant="text" sx={{ fontSize: "1.5rem", width: "60%" }} />
      <Skeleton variant="rectangular" width="100%" height={120} />
    </Stack>
  </Box>
);

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const counters = useSelector(selectCounters);
  const loading = useSelector((state) => state.counter.loading);

  const fetchCounters = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${API_BASE_URL}/counters`);
      const { counters } = response.data;
      dispatch(setCounter(counters));
    } catch (error) {
      console.log("Error fetching counters", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchCounters();
  }, []);

  const handleCounterClick = (counterId, counter) => {
    console.log('cuurent counter', counter);
    dispatch(setCurrentCounter(counter));
    navigate(`/counter/${counterId}`);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <h1 className="text-3xl mb-4">Food Counters</h1>

      {loading ? (
        <div className="">
          {Array.from(new Array(6)).map((_, index) => (
            <CounterSkeleton key={index} />
          ))}
        </div>
      ) : counters && counters.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {counters.map((counter) => (
            <li
              key={counter._id}
              className="p-4 bg-white shadow-lg rounded-2xl border hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCounterClick(counter._id, counter)}
            >
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                {counter.name}
              </h3>
              <p className="text-gray-600">{counter.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">No counters available.</p>
        </div>
      )}
    </Box>
  );
};

export default Home;
