import { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar.jsx";
import DashboardHero from "../../components/Shop/DashboardHero.jsx";

function ShopDashboardPage() {
  return (
    <div>
      <DashboardHeader />

      <div className="max-w-7xl">
        <div className="flex gap-6">
          <div className="w-80 sticky top-8 h-fit">
            <DashboardSideBar active={1} />
          </div>
          <div className="flex-1">
            <DashboardHero />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopDashboardPage;
