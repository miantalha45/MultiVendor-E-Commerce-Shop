import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader.jsx";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllSellers from "../../components/Admin/AllSellers.jsx";

const AdminDashboardSellers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="max-w-7xl">
        <div className="flex gap-6">
          <div className="w-80 sticky top-8 h-fit">
            <AdminSideBar active={3} />
          </div>
          <div className="flex-1">
            <AllSellers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSellers;
