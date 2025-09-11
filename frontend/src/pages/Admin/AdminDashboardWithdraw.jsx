import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllWithdraw from "../../components/Admin/AllWithdraw.jsx";

const AdminDashboardWithdraw = () => {
  return (
    <div>
      <AdminHeader />
      <div className="max-w-7xl">
        <div className="flex gap-6">
          <div className="w-80 sticky top-8 h-fit">
            <AdminSideBar active={7} />
          </div>
          <div className="flex-1">
            <AllWithdraw />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdraw;
