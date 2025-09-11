import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai"
import { FiPackage, FiShoppingBag } from "react-icons/fi"
import { MdOutlineLocalOffer } from "react-icons/md"
import { RxDashboard } from "react-icons/rx"
import { VscNewFile } from "react-icons/vsc"
import { CiMoneyBill, CiSettings } from "react-icons/ci"
import { Link } from "react-router-dom"
import { BiMessageSquareDetail } from "react-icons/bi"
import { HiOutlineReceiptRefund } from "react-icons/hi"

const DashboardSideBar = ({ active }) => {
  const menuItems = [
    { id: 1, title: "Dashboard", icon: RxDashboard, link: "/dashboard" },
    { id: 2, title: "All Orders", icon: FiShoppingBag, link: "/dashboard-orders" },
    { id: 3, title: "All Products", icon: FiPackage, link: "/dashboard-products" },
    { id: 4, title: "Create Product", icon: AiOutlineFolderAdd, link: "/dashboard-create-product" },
    { id: 5, title: "All Events", icon: MdOutlineLocalOffer, link: "/dashboard-events" },
    { id: 6, title: "Create Event", icon: VscNewFile, link: "/dashboard-create-event" },
    { id: 7, title: "Withdraw Money", icon: CiMoneyBill, link: "/dashboard-withdraw-money" },
    { id: 8, title: "Shop Inbox", icon: BiMessageSquareDetail, link: "/dashboard-messages" },
    { id: 9, title: "Discount Codes", icon: AiOutlineGift, link: "/dashboard-coupons" },
    { id: 10, title: "Refunds", icon: HiOutlineReceiptRefund, link: "/dashboard-refunds" },
    { id: 11, title: "Settings", icon: CiSettings, link: "/settings" },
  ]

  return (
    <div className="w-20 800px:w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-2 800px:p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id

          return (
            <Link
              key={item.id}
              to={item.link}
              className={`flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                size={20}
                className={`flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"}`}
              />
              <span className="hidden 800px:block ml-3 font-medium text-sm">{item.title}</span>
              {isActive && <div className="hidden 800px:block ml-auto w-2 h-2 bg-blue-600 rounded-full"></div>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

export default DashboardSideBar
