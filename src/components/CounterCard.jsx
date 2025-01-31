import { useState } from "react";
import { Store, Clock, Users, Pencil } from "lucide-react";
import EditCounterModal from "@/components/EditCounterModal";
import { DEFAULT_IMG_PATH } from "@/utils/constants";

const CounterCard = ({ counter, onClick, onEdit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const handleSave = (updatedCounter) => {
    onEdit(updatedCounter);
    setIsEditModalOpen(false);
  };


  return (
    <>
      <div 
        onClick={onClick}
        className="group relative h-[280px] bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 
          hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={counter.image || DEFAULT_IMG_PATH}
            alt={counter.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative h-full p-6 flex flex-col">
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div className="bg-gray-900/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <Store className="h-5 w-5 text-purple-400" />
            </div>
            <button
              onClick={handleEditClick}
              className="bg-gray-900/60 backdrop-blur-sm p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Pencil className="h-4 w-4 text-white" />
            </button>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
              {counter.name}
            </h3>
            <p className="text-gray-200 text-sm line-clamp-2 mb-4">
              {counter.description}
            </p>

            {/* Status Indicators */}
            <div className="flex items-center gap-4">
              <div className="bg-gray-900/60 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-gray-200">Open Now</span>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-gray-200">Popular</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EditCounterModal
        counter={counter}
        isOpen={isEditModalOpen}
        onSave={handleSave}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};

export default CounterCard;