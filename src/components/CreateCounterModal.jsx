// CreateCounterModal.jsx
import React, { useState, useEffect } from "react";
import { X, Save, Search } from "lucide-react";

const CreateCounterModal = ({ onSave, onClose, isOpen, merchants }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    merchants: []
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMerchantToggle = (merchantId) => {
    setFormData(prev => {
      if (prev.merchants.includes(merchantId)) {
        if (prev.merchants.length > 1) {
          return { 
            ...prev, 
            merchants: prev.merchants.filter(id => id !== merchantId)
          };
        }
        return prev;
      }
      return { 
        ...prev, 
        merchants: [...prev.merchants, merchantId]
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (formData.merchants.length === 0) newErrors.merchants = "Select at least one merchant";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    onSave(formData);
    // Reset form
    setFormData({
      name: "",
      description: "",
      image: "",
      merchants: []
    });
    onClose();
  };

  const canUnselect = (merchantId) => {
    return formData.merchants.length > 1 || !formData.merchants.includes(merchantId);
  };

  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-10">
      <div
        className="w-full max-w-lg bg-gray-800 rounded-xl shadow-xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Create Counter</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Counter Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-gray-700 border ${
                errors.name ? "border-red-500" : "border-gray-600"
              } rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">
                Associated Merchants *
              </label>
              <div className="relative w-48">
                <input
                  type="text"
                  placeholder="Search merchants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-8 pr-3 py-1.5 text-sm text-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-2 top-2.5" />
              </div>
            </div>
            
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {filteredMerchants.length === 0 ? (
                <p className="text-gray-400 text-sm py-2 text-center">
                  No merchants found
                </p>
              ) : (
                filteredMerchants.map(merchant => (
                  <label
                    key={merchant._id}
                    className={`flex items-center space-x-3 bg-gray-700/50 p-3 rounded-lg transition-colors cursor-pointer
                      ${!canUnselect(merchant._id) ? 'opacity-75' : 'hover:bg-gray-700'}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.merchants.includes(merchant._id)}
                      onChange={() => handleMerchantToggle(merchant._id)}
                      className={`h-4 w-4 text-purple-500 rounded border-gray-600 focus:ring-purple-500 bg-gray-800
                        ${!canUnselect(merchant._id) ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    />
                    <span className="text-gray-200 text-sm">
                      {merchant.name}
                      {!canUnselect(merchant._id) && 
                        <span className="text-gray-400 text-xs ml-2">(Required)</span>
                      }
                    </span>
                  </label>
                ))
              )}
            </div>
            {errors.merchants && (
              <p className="mt-1 text-sm text-red-500">{errors.merchants}</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <Save className="h-4 w-4" />
            Create Counter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCounterModal;