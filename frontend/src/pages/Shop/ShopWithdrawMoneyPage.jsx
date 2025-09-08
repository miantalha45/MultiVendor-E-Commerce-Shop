import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopWithdrawMoney from "../../components/Shop/ShopWithdrawMoney.jsx";

const ShopWithdrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={7} />
        </div>
        <div className="w-full flex justify-center">
          <ShopWithdrawMoney />
        </div>
      </div>
    </div>
  );
};

export default ShopWithdrawMoneyPage;
