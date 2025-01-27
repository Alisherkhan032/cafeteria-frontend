import React, { useEffect } from 'react'
import { setLoading, selectloadingState } from '@/slices/counterSlice'
import { selectCurrentUser, setMerchantCounters, selectMerchantCounters } from '@/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { API_BASE_URL } from '@/utils/apiConfigs'
import { CounterSkeleton } from '@/utils/skeletonConfig'
import MerchantCounters from '@/components/MerchantCounters'

const Merchant = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectloadingState)
  const merchant = useSelector(selectCurrentUser)
  const merchantCounters = useSelector(selectMerchantCounters)

  console.log('merchant is', merchant)
  console.log('merchant counters are : ', merchantCounters)

  const CountersOfMerchants = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${API_BASE_URL}/users/counters/merchant/${merchant._id}`);
      console.log('Counters:', response.data);
      const counters = response.data.counters;
      dispatch(setMerchantCounters(counters));

    } catch (error) {
      console.log("Error fetching counters", error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(()=>{
    CountersOfMerchants();
  },[merchant])

  

  return (
    <div>

      {loading ? (
        <div className="">
          {Array.from(new Array(6)).map((_, index) => (
            <CounterSkeleton key={index} />
          ))}
        </div>
      ) : merchantCounters && merchantCounters.length > 0 ? (
        <MerchantCounters counters={merchantCounters} merchantName={merchant?.name} />
      ) : (
        <div className="text-center mt-10">
          <p className="text-gray-500 text-lg">No merchant Counters available.</p>
        </div>
      )}
    </div>
  )
}

export default Merchant