import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCounter, setLoading, updateCounter } from "@/slices/counterSlice";
import { API_BASE_URL } from "@/utils/apiConfigs";
import { selectCounters, setCurrentCounter } from "@/slices/counterSlice";
import { Store, Clock, Users, ChefHat } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CounterCard from "@/components/CounterCard";
import NavbarLayout from "@/components/NavbarLayout";
import { makeApiCall } from "@/services/makeApiCall";
import Breadcrumb from "@/components/Breadcrumb";

const CounterSkeleton = () => (
  <div className="bg-gray-800/50 rounded-xl p-6 animate-pulse">
    <div className="h-8 bg-gray-700 rounded-lg w-1/3 mb-4"></div>
    <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    <div className="mt-6 flex gap-4">
      <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
      <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
    </div>
  </div>
);

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const counters = useSelector(selectCounters);
  const loading = useSelector((state) => state.counter.loading);

  const breadcrumbItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Counters",
      path: "/home",
    },
  ];

  const fetchCounters = async () => {
    try {
      dispatch(setLoading(true));
      // const response = await axios.get(`${API_BASE_URL}/counters`);
      const response = await makeApiCall("get", "/counters");

      const { counters } = response;

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

  useEffect(() => {
    scroll({
      top: 0,
      behavior: "instant",
    });
  });

  const handleCounterClick = (counterId, counter) => {
    dispatch(setCurrentCounter(counter));
    navigate(`/counter/${counterId}`);
  };

  const handleEditCounter = async (updatedData) => {
    try {
      dispatch(setLoading(true));
      // const response = await axios.put(
      //   `${API_BASE_URL}/counters/${updatedData.id}`,
      //   updatedData
      // );
      const response = await makeApiCall(
        "put",
        `/counters/${updatedData.id}`,
        updatedData
      );
      const updatedCounter = response.data.counter;
      dispatch(updateCounter(updatedCounter));
    } catch (error) {
      console.error("Error updating counter:", error);
      //todo : toast notification
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen px-2 sm:px-6 md:px-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-16 sm:pt-20 pb-16">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            Food Counters
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Explore our diverse selection of food counters, each offering unique
            and delicious cuisines prepared by expert chefs.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {Array.from(new Array(6)).map((_, index) => (
              <CounterSkeleton key={index} />
            ))}
          </div>
        ) : counters && counters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {counters.map((counter) => (
              <CounterCard
                key={counter._id}
                counter={counter}
                onClick={() => handleCounterClick(counter._id, counter)}
                onEdit={handleEditCounter}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <ChefHat className="h-12 w-12 sm:h-16 sm:w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-base sm:text-lg">
              No food counters available at the moment.
            </p>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Please check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Wrapper() {
  return (
    <NavbarLayout>
      <Home />
    </NavbarLayout>
  );
}
