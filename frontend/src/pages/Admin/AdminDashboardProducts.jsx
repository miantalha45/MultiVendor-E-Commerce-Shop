import React from "react";
import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllProducts from "../../components/Admin/AllProducts.jsx";

const AdminDashboardProducts = () => {
  return (
    <div>
      <AdminHeader />
      <div className="max-w-7xl">
        <div className="flex gap-6">
          <div className="w-80 sticky top-8 h-fit">
            <AdminSideBar active={5} />
          </div>
          <div className="flex-1">
            <AllProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardProducts;
