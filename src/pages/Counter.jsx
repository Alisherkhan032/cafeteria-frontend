import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDishes,
  dishesInCounter,
  selectloadingState,
  setLoading,
  selectCurrentCounter,
  setCurrentCounter,
} from "@/slices/counterSlice";
import { useParams } from "react-router-dom";
import { Store, ChefHat, HomeIcon, ShoppingCartIcon, Soup } from "lucide-react";
import DishList from "@/components/DishList";
import { makeApiCall } from "@/services/makeApiCall";
import NavbarLayout from "@/components/NavbarLayout";
import Breadcrumb from "@/components/Breadcrumb";

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

  const breadcrumbItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Counters",
      path: `/merchant`,
    },
    {
      label: "Dishes",
      path: "/",
    },
  ];

  const fetchDishes = async () => {
    try {
      dispatch(setLoading(true));
      const responseData = await makeApiCall(
        "get",
        `/dishes/counter/${counterId}`
      );
      const { dishes } = responseData;
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
      const responseData = await makeApiCall("get", `/counters/${counterId}`);
      const currentCounter = responseData;
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
    <div className="min-h-screen px-4 md:px-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from(new Array(3)).map((_, index) => (
              <CounterSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="text-center mb-12 -mt-10">
              <div className="inline-flex items-center justify-center p-3 bg-gray-800 rounded-full mb-4">
                <Store className="h-8 w-8 text-purple-500" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {counterName}
              </h1>
              <div className="h-1 w-16 sm:w-20 bg-purple-500 mx-auto rounded-full"></div>
            </div>
            <DishList dishes={dishes} counterId={counterId} />
          </>
        )}
      </div>
    </div>
  );
};

export default function Wrapper() {
  return (
    <NavbarLayout>
      <Counter />
    </NavbarLayout>
  );
}
