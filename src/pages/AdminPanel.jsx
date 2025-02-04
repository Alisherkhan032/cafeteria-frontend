import React from "react";
import { Link } from "react-router-dom";
import { Users, Coffee } from "lucide-react";
import NavbarLayout from "@/components/NavbarLayout";
import Breadcrumb from "@/components/Breadcrumb";

const AdminPanel = () => {
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
      label: "Admin Panel",
      path: "/admin",
    },
  ];
  return (
    <div className="min-h-screen px-2 sm:px-6 md:px-20 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <Breadcrumb items={breadcrumbItems} />
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/manage-counters" className="block h-full">
            <div className="rounded-lg p-6 hover:bg-gray-800 transition-all duration-300 border-2 border-gray-700 bg-gray-900/60 group h-full">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors shrink-0">
                  <Coffee className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Manage Food Counters
                  </h2>
                  <p className="text-gray-400">
                    Add, edit, or remove food counters and manage their menus
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link to="/manage-users" className="block h-full">
            <div className="rounded-lg p-6 hover:bg-gray-800 transition-all duration-300 border-2 border-gray-700 bg-gray-900/60 group h-full">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors shrink-0">
                  <Users className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    Manage Users
                  </h2>
                  <p className="text-gray-400">
                    Control user access, roles, and permissions
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Wrapper() {
  return (
    <NavbarLayout>
      <AdminPanel />
    </NavbarLayout>
  );
}
