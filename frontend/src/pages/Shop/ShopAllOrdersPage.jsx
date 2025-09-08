import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopAllOrders from "../../components/Shop/ShopAllOrders.jsx";

const ShopAllOrdersPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-full flex justify-center">
          <ShopAllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrdersPage;
