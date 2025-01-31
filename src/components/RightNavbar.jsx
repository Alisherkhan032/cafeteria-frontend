import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartQantity } from "@/slices/cartSlice";

const RightNavbar = () => {
  const cartQuantity = useSelector(selectCartQantity) || 0;
  return (
    <Link to="/cart" >
      <div>
      Cart ({cartQuantity})
    </div>
    </Link>
  );
};

export default RightNavbar;
