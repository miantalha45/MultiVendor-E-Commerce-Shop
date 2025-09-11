import { AiOutlineGift } from "react-icons/ai"
import { MdOutlineLocalOffer } from "react-icons/md"
import { FiPackage, FiShoppingBag } from "react-icons/fi"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { BiMessageSquareDetail } from "react-icons/bi"

function DashboardHeader() {
  const { seller } = useSelector((state) => state.seller)

  return (
    <div className="w-full h-16 bg-white border-b border-gray-200 sticky top-0 left-0 z-30 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center">
        <Link to="/dashboard" className="flex items-center">
          <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="Logo" className="h-8 w-auto" />
          <span className="ml-3 text-lg font-semibold text-gray-900 hidden sm:block">Seller Dashboard</span>
        </Link>
      </div>

      <div className="flex items-center space-x-1">
        <Link
          to="/dashboard/cupouns"
          className="hidden 800px:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors group"
          title="Coupons"
        >
          <AiOutlineGift size={20} className="text-gray-600 group-hover:text-blue-600" />
        </Link>

        <Link
          to="/dashboard-events"
          className="hidden 800px:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors group"
          title="Events"
        >
          <MdOutlineLocalOffer size={20} className="text-gray-600 group-hover:text-blue-600" />
        </Link>

        <Link
          to="/dashboard-products"
          className="hidden 800px:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors group"
          title="Products"
        >
          <FiShoppingBag size={20} className="text-gray-600 group-hover:text-blue-600" />
        </Link>

        <Link
          to="/dashboard-orders"
          className="hidden 800px:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors group"
          title="Orders"
        >
          <FiPackage size={20} className="text-gray-600 group-hover:text-blue-600" />
        </Link>

        <Link
          to="/dashboard-messages"
          className="hidden 800px:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors group"
          title="Messages"
        >
          <BiMessageSquareDetail size={20} className="text-gray-600 group-hover:text-blue-600" />
        </Link>

        <div className="ml-4 flex items-center">
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${seller.avatar?.url}`}
              alt="Seller Avatar"
              className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 hover:border-blue-300 transition-colors"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
