import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardMessages from "../../components/Shop/DashboardMessages.jsx";

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={8} />
        </div>
        <div className="w-full flex justify-center">
          <DashboardMessages />
        </div>
      </div>
    </div>
  );
};

export default ShopInboxPage;
