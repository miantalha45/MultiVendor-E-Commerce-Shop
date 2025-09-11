import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const menuItems = [
    { id: 1, icon: RxPerson, label: "Profile", action: () => setActive(1) },
    {
      id: 2,
      icon: HiOutlineShoppingBag,
      label: "Orders",
      action: () => setActive(2),
    },
    {
      id: 3,
      icon: HiOutlineReceiptRefund,
      label: "Refunds",
      action: () => setActive(3),
    },
    {
      id: 4,
      icon: AiOutlineMessage,
      label: "Inbox",
      action: () => {
        setActive(4);
        navigate("/inbox");
      },
    },
    {
      id: 5,
      icon: MdOutlineTrackChanges,
      label: "Track Order",
      action: () => setActive(5),
    },
    {
      id: 6,
      icon: RiLockPasswordLine,
      label: "Change Password",
      action: () => setActive(6),
    },
    {
      id: 7,
      icon: TbAddressBook,
      label: "Address",
      action: () => setActive(7),
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar?.url || "/placeholder.svg"}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`flex items-center cursor-pointer w-full p-3 rounded-xl mb-2 transition-all duration-200 group ${
                active === item.id
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
              onClick={item.action}
            >
              <Icon
                size={20}
                className={`${
                  active === item.id
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              <span className="pl-3 font-medium">{item.label}</span>
            </div>
          );
        })}

        {user && user?.role === "Admin" && (
          <Link to="/admin/dashboard">
            <div
              className={`flex items-center cursor-pointer w-full p-3 rounded-xl mb-2 transition-all duration-200 group ${
                active === 8
                  ? "bg-purple-50 text-purple-600 border border-purple-200"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
              onClick={() => setActive(8)}
            >
              <MdOutlineAdminPanelSettings
                size={20}
                className={`${
                  active === 8
                    ? "text-purple-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
              <span className="pl-3 font-medium">Admin Dashboard</span>
            </div>
          </Link>
        )}

        <div
          className="flex items-center cursor-pointer w-full p-3 rounded-xl mb-2 transition-all duration-200 group hover:bg-red-50 text-gray-700 hover:text-red-600 border-t border-gray-100 mt-4 pt-4"
          onClick={logoutHandler}
        >
          <AiOutlineLogin
            size={20}
            className="text-gray-500 group-hover:text-red-600"
          />
          <span className="pl-3 font-medium">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
