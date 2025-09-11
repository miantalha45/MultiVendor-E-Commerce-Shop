import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader.jsx";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar.jsx";
import AdminDashboardMain from "../../components/Admin/AdminDashboardMain.jsx";

const AdminDashboardPage = () => {
  return (
    <div>
      <AdminHeader />

      <div className="max-w-7xl">
        <div className="flex gap-6">
          <div className="w-80 sticky top-8 h-fit">
            <AdminSideBar active={1} />
          </div>
          <div className="flex-1">
            <AdminDashboardMain />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
