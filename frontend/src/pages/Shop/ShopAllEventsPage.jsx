import React from "react";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import ShopAllEvents from "../../components/Shop/ShopAllEvents.jsx";

const ShopAllEventsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full flex justify-center">
          <ShopAllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEventsPage;
