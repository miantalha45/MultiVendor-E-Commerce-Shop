import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopAllCoupons from "../../components/Shop/ShopAllCoupons.jsx";

const ShopAllCouponsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-full flex justify-center">
          <ShopAllCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCouponsPage;
