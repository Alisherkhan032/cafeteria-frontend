import React, { useState } from "react";
import {
  Menu,
  X,
  Store,
  ShieldCheck,
  ShoppingCart,
  UtensilsCrossed,
  CircleUserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-2 flex items-center justify-between bg-gray-900 z-50 border-b border-gray-700 shadow-lg">
      <Link to='/'>
        <div className="flex items-center space-x-3">
          <UtensilsCrossed className="text-yellow-400" size={28} />
          <div className="text-white text-2xl font-bold whitespace-nowrap">
            Urban-Eats
          </div>
        </div>
      </Link>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          className="text-white hover:text-yellow-400 transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="relative top-0 left-0 w-full flex flex-row items-center justify-end bg-gray-900 text-white space-x-8 px-6 py-3">
        <Link
          to="/home"
          className="flex items-center space-x-2 hover:text-yellow-400 transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          <Store size={20} />
          <span className="text-lg">Food Counters</span>
        </Link>

        <Link
          to="/admin"
          className="flex items-center space-x-2 hover:text-yellow-400 transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          <ShieldCheck size={20} />
          <span className="text-lg">Admin Panel</span>
        </Link>

        <Link
          to="/merchant"
          className="flex items-center space-x-2 hover:text-yellow-400 transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          <CircleUserRound size={20} />
          <span className="text-lg">Merchant Panel</span>
        </Link>

        <Link
          to="/cart"
          className="flex items-center space-x-2 hover:text-yellow-400 transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          <ShoppingCart size={20} />
          <span className="text-lg">Cart</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
