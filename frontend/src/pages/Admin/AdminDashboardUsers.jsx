import AdminHeader from "../../components/Admin/Layout/AdminHeader";
import AdminSideBar from "../../components/Admin/Layout/AdminSideBar";
import AllUsers from "../../components/Admin/AllUsers";

const AdminDashboardUsers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="max-w-7xl">
        <div className="flex gap-6">
          <div className="w-80 sticky top-8 h-fit">
            <AdminSideBar active={4} />
          </div>
          <div className="flex-1">
            <AllUsers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
