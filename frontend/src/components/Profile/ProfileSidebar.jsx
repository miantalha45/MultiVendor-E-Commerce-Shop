import axios from "axios";
import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { TbAddressBook } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";

function ProfileSidebar({ active, setActive }) {
  const navigate = useNavigate();
  const sideOptions = [
    { id: 1, name: "Profile", icon: RxPerson },
    { id: 2, name: "Orders", icon: HiOutlineShoppingBag },
    { id: 3, name: "Refunds", icon: HiOutlineReceiptRefund },
    { id: 4, name: "Inbox", icon: AiOutlineMessage, nav: "/inbox" },
    { id: 5, name: "Track Order", icon: MdOutlineTrackChanges },
    { id: 6, name: "Change Password", icon: RiLockPasswordLine },
    { id: 7, name: "Address", icon: TbAddressBook },
    { id: 8, name: "Log out", icon: AiOutlineLogin, nav: "/" },
  ];

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      {sideOptions.map((i) => (
        <div
          className="flex items-center cursor-pointer w-full mb-8"
          onClick={
            i.id === 8
              ? logoutHandler
              : () => setActive(i.id) || (i.id === 4 ? navigate(i.nav) : "")
          }
        >
          <i.icon size={20} color={active === i.id ? "red" : ""} />
          <span
            className={`pl-3 ${
              active === i.id ? "text-[red]" : ""
            } 800px:block hidden`}
          >
            {i.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ProfileSidebar;
