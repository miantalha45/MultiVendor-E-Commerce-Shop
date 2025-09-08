import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopCreateProduct from "../../components/Shop/ShopCreateProduct.jsx";

function ShopCreateProductPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full flex justify-center">
          <ShopCreateProduct />
        </div>
      </div>
    </div>
  );
}

export default ShopCreateProductPage;
