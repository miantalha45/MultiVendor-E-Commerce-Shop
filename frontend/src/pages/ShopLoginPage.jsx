import React, { useEffect } from "react";
import ShopLogin from "../components/Shop/ShopLogin.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ShopLoginPage() {
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSeller === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isSeller]);
  return (
    <div>
      <ShopLogin />
    </div>
  );
}

export default ShopLoginPage;
