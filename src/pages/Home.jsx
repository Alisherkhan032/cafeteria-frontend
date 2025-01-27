import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCounter, setLoading } from "@/slices/counterSlice";
import { API_BASE_URL } from "@/utils/apiConfigs";
import { selectCounters, setCurrentCounter } from "@/slices/counterSlice";
import { Store, Clock, Users, ChefHat } from 'lucide-react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const CounterCard = ({ counter, onClick }) => (
  <div 
    onClick={onClick}
    className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-purple-500/50"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {counter.name}
        </h3>
        <p className="text-gray-400 line-clamp-2">{counter.description}</p>
      </div>
      <div className="bg-gray-900/50 p-2 rounded-lg">
        <Store className="h-6 w-6 text-purple-400" />
      </div>
    </div>
    
    <div className="flex items-center gap-6 mt-6">
      <div className="flex items-center gap-2 text-gray-400">
        <Clock className="h-4 w-4" />
        <span className="text-sm">Open Now</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <Users className="h-4 w-4" />
        <span className="text-sm">Popular</span>
      </div>
    </div>
  </div>
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
  
  useEffect(()=>{
    scroll({
      top: 0,
      behavior: "instant"
    })
  })

  const handleCounterClick = (counterId, counter) => {
    dispatch(setCurrentCounter(counter));
    navigate(`/counter/${counterId}`);
  };

  return (
    <div className="min-h-screen px-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Food Counters
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our diverse selection of food counters, each offering unique and delicious cuisines prepared by expert chefs.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from(new Array(6)).map((_, index) => (
              <CounterSkeleton key={index} />
            ))}
          </div>
        ) : counters && counters.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counters.map((counter) => (
              <CounterCard
                key={counter._id}
                counter={counter}
                onClick={() => handleCounterClick(counter._id, counter)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-800/50 rounded-xl backdrop-blur-sm">
            <ChefHat className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              No food counters available at the moment.
            </p>
            <p className="text-gray-500 mt-2">
              Please check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;