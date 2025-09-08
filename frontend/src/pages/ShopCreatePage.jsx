import { useNavigate } from "react-router-dom";
import ShopCreate from "../components/Shop/ShopCreate.jsx";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ShopCreatePage = () => {
  const { isSeller, seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSeller === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, []);
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
