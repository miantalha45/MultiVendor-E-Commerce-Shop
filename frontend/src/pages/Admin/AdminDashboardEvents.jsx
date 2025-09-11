import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllEvents from "../../components/Admin/AllEvents.jsx";

const AdminDashboardEvents = () => {
  return (
    <div>
      <AdminHeader />
      <div className="max-w-7xl">
        <div className="flex gap-6">
          <div className="w-80 sticky top-8 h-fit">
            <AdminSideBar active={6} />
          </div>
          <div className="flex-1">
            <AllEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEvents;
