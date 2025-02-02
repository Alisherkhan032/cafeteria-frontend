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
import {capitalize} from 'lodash'
import { ROLES } from "@/utils/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const totalItemsInCart = useSelector(selectCartQantity);
  const user = useSelector(selectCurrentUser)

  return (
    <nav className="w-full px-6 py-2 flex items-center justify-between bg-gray-900 z-50 border-b border-gray-700 shadow-lg">
      <Link to="/">
        <div className="flex items-center space-x-3">
          <UtensilsCrossed className="text-yellow-400" size={28} />
          <div className="text-white text-2xl font-bold whitespace-nowrap">
            Urban-Eats
          </div>
        </div>
      </Link>

      <div className="text-white text-xl ml-4 mt-1 whitespace-nowrap">
        Welcome <span className=" text-base text-yellow-400">{capitalize(user?.name)}</span>
      </div>

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
        {user && <Link
          to="/home"
          className="flex items-center space-x-2 hover:text-yellow-400 transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          <Store size={20} />
          <span className="text-lg">Food Counters</span>
        </Link>}

        {!user && <Link
          to="/login"
          className="flex items-center space-x-2 hover:text-yellow-400 transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          <UserCog size={20} />
          <span className="text-lg">Sign In</span>
        </Link>}

        {user && user.role === ROLES.ADMIN && <Link
          to="/admin"
          className="flex items-center space-x-2 hover:text-yellow-400 transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          <ShieldCheck size={20} />
          <span className="text-lg">Admin Panel</span>
        </Link>}

        {user && user.role === ROLES.MERCHANT && <Link
          to="/merchant"
          className="flex items-center space-x-2 hover:text-yellow-400 transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          <CircleUserRound size={20} />
          <span className="text-lg">Merchant Panel</span>
        </Link>}

        {user && <Link
          to="/profile"
          className="flex items-center space-x-2 hover:text-yellow-400 transition-colors py-2 md:py-0"
          onClick={() => setIsOpen(false)}
        >
          <UserPen size={20} />
          <span className="text-lg">Profile</span>
        </Link>}

        {user && user.role === ROLES.CUSTOMER &&<div className="flex items-center gap-x-3 ">
          <Link to="/cart" className="flex items-center gap-x-1">
            <div className="text-white text-3xl font-medium flex justify-center -space-x-5 space-y-1">
              <i className="fi fi-rs-dolly-flatbed-empty"></i>
              <span className="text-yellow-400  text-xl ml-1 -mt-1">
                {totalItemsInCart}
              </span>{" "}
            </div>
            <div className=" flex flex-col justify-center -space-y-4">
              <span className="text-white text-lg  ml-2">Cart</span>{" "}
            </div>
          </Link>
        </div>}
      </div>
    </nav>
  );
};

export default Navbar;
