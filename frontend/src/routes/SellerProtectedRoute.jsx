import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

function SellerProtectedRoute({ children }) {
  const { isSeller, isLoading } = useSelector((state) => state.seller);
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (isSeller === false) {
      return <Navigate to="/shop-login" replace />;
    }
  }
  return children;
}

export default SellerProtectedRoute;
