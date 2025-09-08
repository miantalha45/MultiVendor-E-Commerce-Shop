import { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader.jsx";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar.jsx";

function ShopDashboardPage() {
  const [active, setActive] = useState(1);
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex items-center justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
      </div>
    </div>
  );
}

export default ShopDashboardPage;
