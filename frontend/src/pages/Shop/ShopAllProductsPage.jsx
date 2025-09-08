import React from "react";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import ShopAllProducts from "../../components/Shop/ShopAllProducts.jsx";

const ShopAllProductsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-full flex justify-center">
          <ShopAllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProductsPage;
