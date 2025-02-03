import React, { useEffect, useState } from "react";
import { selectAllUsers, setUsers } from "@/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import NavbarLayout from "@/components/NavbarLayout";
import { makeApiCall } from "@/services/makeApiCall";
import { CounterSkeleton } from "@/utils/skeletonConfig";

const ManageUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "customer",
    password: "",
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      console.log('searchTerm', searchTerm);
      const params = {
        page: currentPage,
        role: selectedRole !== "all" ? selectedRole : undefined,
        search: searchTerm,
      };

      // const response = await axios.get(`${API_BASE_URL}/users`, { params });
      const responseData = await makeApiCall("get", "/users", null,  params);
      console.log(responseData);
      dispatch(setUsers(responseData.users));
      setTotalPages(responseData.totalPages || 1);

      // If current page is greater than total pages, reset to page 1
      if (currentPage > (responseData.totalPages || 1)) {
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search term changes
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle role selection changes
  const handleRoleChange = (value) => {
    setSelectedRole(value);
    setCurrentPage(1); // Reset to first page when changing role filter
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedRole, currentPage]);

  const handleRoleChangeForUser = async (userId, newRole) => {
    try {
      await makeApiCall("patch", `/users/${userId}`, { role: newRole });
      fetchUsers(); // Refresh the list after successful update
    } catch (error) {
      console.error("Error updating role:", error);
      
      // Check if the error response contains the specific message
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); // Display the error message to the user
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };
  

  const handleAddUser = async () => {
    try {
      // await axios.post(`${AUTH_BASE_URL}/register`, newUser);
      await makeApiCall("post", "/register", newUser);
      setShowAddModal(false);
      fetchUsers();
      toast.success("User created successfully");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error(error.responseData?.message || "Failed to create User");
    } finally {
      setNewUser({
        name: "",
        email: "",
        role: "customer",
        password: "",
      });
    }
  };

  if (loading) {
    return (
      <div className="px-8 min-h-screen py-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <CounterSkeleton />
        <CounterSkeleton />
        <CounterSkeleton />
      </div>
    );
  }

  return (
    <div className="px-8 min-h-screen py-6 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Filters Section */}
      <Toaster position="top-right" />
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-white">User Management</h1>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <select
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="merchant">Merchant</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <UserPlus className="h-5 w-5" />
            <span className="hidden sm:inline">Add User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/60">
            <tr>
              <th className="px-6 py-4 text-left text-gray-300 font-medium">
                Name
              </th>
              <th className="px-6 py-4 text-left text-gray-300 font-medium">
                Email
              </th>
              <th className="px-6 py-4 text-left text-gray-300 font-medium">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-700/50 hover:bg-gray-900/20"
              >
                <td className="px-6 py-4 text-white">{user.name}</td>
                <td className="px-6 py-4 text-gray-400">{user.email}</td>
                <td className="px-6 py-4">
                  <select
                    value={user.role}
                    onChange={(e) =>
                      handleRoleChangeForUser(user._id, e.target.value)
                    }
                    className="bg-gray-700 border border-gray-600 rounded px-3 py-1 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="customer">Customer</option>
                    <option value="merchant">Merchant</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="p-6 text-center text-gray-400">
            No users found matching your criteria
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-gray-400">
          Showing page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="bg-gray-800 disabled:opacity-50 hover:bg-gray-700 px-4 py-2 rounded-lg text-white flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="bg-gray-800 disabled:opacity-50 hover:bg-gray-700 px-4 py-2 rounded-lg text-white flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">Add New User</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="customer">Customer</option>
                  <option value="merchant">Merchant</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="relative">
                <label className="block text-gray-300 mb-2">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 top-8 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <button
                onClick={handleAddUser}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg mt-4"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Wrapper() {
  return (
    <NavbarLayout>
      <ManageUsers />
    </NavbarLayout>
  );
}
