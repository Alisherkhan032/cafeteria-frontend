import React from 'react';
import { User, Mail, LogOut, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import NavbarLayout from '@/components/NavbarLayout';
import { selectCurrentUser } from '@/slices/authSlice';
import { useSelector } from 'react-redux';
import { makeApiCall } from '@/services/makeApiCall';
import { useDispatch } from 'react-redux';
import { resetAuthSlice } from '@/slices/authSlice';
import { resetCart } from '@/slices/cartSlice';
import { resetCounterSlice } from '@/slices/counterSlice';
import Breadcrumb from '@/components/Breadcrumb';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser)

  const breadcrumbItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Counters",
      path: "/home",
    },
    {
      label: "Profile",
      path: "/profile",
    },
  ];

  const handleLogout = async () => {
    await makeApiCall( 'post','/auth/logout');
    // Reset all slices
    dispatch(resetAuthSlice());
    dispatch(resetCart());
    dispatch(resetCounterSlice());
    // Clear auth token
    localStorage.removeItem('token');
    // Show success message
    toast.success('Logged out successfully');
    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="min-h-screen px-2 sm:px-6 md:px-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-3xl mx-auto">
        {/* Profile Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-700/50">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors duration-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            {/* Profile Picture Placeholder */}
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-gray-700/50 rounded-full flex items-center justify-center">
                <User size={48} className="text-gray-400" />
              </div>
            </div>

            {/* Name Section */}
            <div className="bg-gray-700/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="text-purple-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-lg text-white">{user.name}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                  <Edit2 size={16} className="text-gray-400" />
                </button>
              </div>
            </div>

            {/* Email Section */}
            <div className="bg-gray-700/30 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="text-purple-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-lg text-white">{user.email}</p>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Additional Info Cards can be added here */}
          </div>

          {/* Edit Profile Button */}
          <div className="mt-8">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition-colors duration-200">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Wrapper(){
  return <NavbarLayout>
    <ProfilePage />
  </NavbarLayout>
};