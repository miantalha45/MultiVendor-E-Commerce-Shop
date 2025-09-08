import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopAllRefundOrders from "../../components/Shop/ShopAllRefundOrders.jsx";

const ShopAllRefundsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full flex justify-center">
          <ShopAllRefundOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefundsPage;
