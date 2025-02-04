import React, { useState } from "react";
import {
  Menu,
  X,
  Store,
  ShieldCheck,
  ShoppingCart,
  UtensilsCrossed,
  CircleUserRound,
  UserPen,
  UserCog,
} from "lucide-react";
import { Link } from "react-router-dom";
import { selectCartQantity } from "@/slices/cartSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/slices/authSlice";
import { capitalize } from "lodash";
import { ROLES } from "@/utils/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const totalItemsInCart = useSelector(selectCartQantity);
  const user = useSelector(selectCurrentUser);

  const NavLinks = () => (
    <>
      {user && (
        <Link
          to="/home"
          className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors py-2"
          onClick={() => setIsOpen(false)}
        >
          <Store size={20} />
          <span className="text-lg">Food Counters</span>
        </Link>
      )}

      {!user && (
        <Link
          to="/login"
          className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors py-2"
          onClick={() => setIsOpen(false)}
        >
          <UserCog size={20} />
          <span className="text-lg">Sign In</span>
        </Link>
      )}

      {user && user.role === ROLES.ADMIN && (
        <Link
          to="/admin"
          className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors py-2"
          onClick={() => setIsOpen(false)}
        >
          <ShieldCheck size={20} />
          <span className="text-lg">Admin Panel</span>
        </Link>
      )}

      {user && user.role === ROLES.MERCHANT && (
        <Link
          to="/merchant"
          className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors py-2"
          onClick={() => setIsOpen(false)}
        >
          <CircleUserRound size={20} />
          <span className="text-lg">Merchant Panel</span>
        </Link>
      )}

      {user && (
        <Link
          to="/profile"
          className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors py-2"
          onClick={() => setIsOpen(false)}
        >
          <UserPen size={20} />
          <span className="text-lg">Profile</span>
        </Link>
      )}

      {user && user.role === ROLES.CUSTOMER && (
        <div className="">
          <Link
            to="/cart"
            className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            <div className="flex items-center  text-white font-medium text-2xl sm:text-3xl">
              <i className="fi fi-rs-dolly-flatbed-empty"></i>
              <span className="text-yellow-400 text-base sm:text-xl -ml-4 -mt-3">
                {totalItemsInCart}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-white text-base sm:text-lg ml-2">Cart</span>
            </div>
          </Link>
        </div>
      )}
    </>
  );

  return (
    <nav className="relative w-full px-6 py-2 bg-gray-900 z-50 border-b border-gray-700 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center space-x-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <UtensilsCrossed className="text-yellow-400" size={28} />
            <div className="text-white text-2xl font-bold whitespace-nowrap">
              Urban-Eats
            </div>
          </Link>

          {/* Welcome Message */}
          <div className="hidden md:block text-white text-xl mt-1 whitespace-nowrap">
            Welcome{" "}
            <span className="text-base text-yellow-400">
              {capitalize(user?.name)}
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-yellow-400 transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-gray-900 border-t border-gray-700 px-6 py-4 space-y-4">
          <div className="text-white text-xl whitespace-nowrap mb-4">
            Welcome{" "}
            <span className="text-base text-yellow-400">
              {capitalize(user?.name)}
            </span>
          </div>
          <NavLinks />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
