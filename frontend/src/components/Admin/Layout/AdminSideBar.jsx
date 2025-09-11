import { FiShoppingBag } from "react-icons/fi"
import { GrWorkshop } from "react-icons/gr"
import { RxDashboard } from "react-icons/rx"
import { CiMoneyBill } from "react-icons/ci"
import { Link } from "react-router-dom"
import { HiOutlineUserGroup } from "react-icons/hi"
import { BsHandbag } from "react-icons/bs"
import { MdOutlineLocalOffer } from "react-icons/md"
import { AiOutlineSetting } from "react-icons/ai"

const AdminSideBar = ({ active }) => {
  const menuItems = [
    { id: 1, title: "Dashboard", icon: RxDashboard, link: "/admin/dashboard" },
    { id: 2, title: "All Orders", icon: FiShoppingBag, link: "/admin-orders" },
    { id: 3, title: "All Sellers", icon: GrWorkshop, link: "/admin-sellers" },
    { id: 4, title: "All Users", icon: HiOutlineUserGroup, link: "/admin-users" },
    { id: 5, title: "All Products", icon: BsHandbag, link: "/admin-products" },
    { id: 6, title: "All Events", icon: MdOutlineLocalOffer, link: "/admin-events" },
    { id: 7, title: "Withdraw Request", icon: CiMoneyBill, link: "/admin-withdraw-request" },
    { id: 8, title: "Settings", icon: AiOutlineSetting, link: "/profile" },
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

export default AdminSideBar
