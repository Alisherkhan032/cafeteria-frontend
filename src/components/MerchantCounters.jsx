import React from "react";

const MerchantCounters = ({ counters, merchantName }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Counters owned by {merchantName}
      </h1>
      <ul className={`flex flex-col gap-6`}>
        {counters.map((counter) => (
          <li
            key={counter._id}
            className="p-6 bg-white shadow-lg rounded-3xl border hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="text-xl font-semibold mb-2 text-gray-800">
                  {counter.name}
                </div>

                {counter?.merchant.length > 0 &&
                  counter?.merchant.map((merchant) => (
                    <p className="text-lg text-gray-600 mb-2">
                      {merchant.name}
                    </p>
                  ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MerchantCounters;
