import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopCreateEvent from "../../components/Shop/ShopCreateEvent.jsx";

const ShopCreateEventPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full flex justify-center">
          <ShopCreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEventPage;
