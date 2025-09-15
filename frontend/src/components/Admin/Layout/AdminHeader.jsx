import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-16 bg-[#1A263A] border-b border-gray-200 sticky top-0 left-0 z-30 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-14 w-auto" />
          <span className="ml-3 text-lg font-semibold text-white hidden sm:block">
            Admin Panel
          </span>
        </Link>
      </div>

      <div className="flex items-center space-x-1">
        <Link
          to="/dashboard-cupouns"
          className="hidden 800px:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors group"
          title="Coupons"
        >
          <AiOutlineGift
            size={20}
            className="text-white group-hover:text-blue-600"
          />
        </Link>

        <Link
          to="/dashboard-events"
          className="hidden 800px:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors group"
          title="Events"
        >
          <MdOutlineLocalOffer
            size={20}
            className="text-white group-hover:text-blue-600"
          />
        </Link>

        <Link
          to="/dashboard-products"
          className="hidden 800px:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors group"
          title="Products"
        >
          <FiShoppingBag
            size={20}
            className="text-white group-hover:text-blue-600"
          />
        </Link>

        <Link
          to="/dashboard-orders"
          className="hidden 800px:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors group"
          title="Orders"
        >
          <FiPackage
            size={20}
            className="text-white group-hover:text-blue-600"
          />
        </Link>

        <Link
          to="/dashboard-messages"
          className="hidden 800px:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors group"
          title="Messages"
        >
          <BiMessageSquareDetail
            size={20}
            className="text-white group-hover:text-blue-600"
          />
        </Link>

        <div className="ml-4 flex items-center">
          <img
            src={`${user?.avatar?.url}`}
            alt="Admin Avatar"
            className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 hover:border-blue-300 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
