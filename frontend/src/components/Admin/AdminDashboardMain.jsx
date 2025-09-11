import { useEffect } from "react";
import { AiOutlineMoneyCollect, AiOutlineShoppingCart } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/seller";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, []);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);
  const adminBalance = adminEarning?.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  const statsCards = [
    {
      title: "Total Earnings",
      value: `$${adminBalance}`,
      icon: AiOutlineMoneyCollect,
      color: "bg-green-50 text-green-600",
      iconBg: "bg-green-100",
    },
    {
      title: "All Sellers",
      value: sellers?.length || 0,
      icon: HiOutlineUserGroup,
      color: "bg-blue-50 text-blue-600",
      iconBg: "bg-blue-100",
      link: "/admin-sellers",
      linkText: "View Sellers",
    },
    {
      title: "All Orders",
      value: adminOrders?.length || 0,
      icon: AiOutlineShoppingCart,
      color: "bg-purple-50 text-purple-600",
      iconBg: "bg-purple-100",
      link: "/admin-orders",
      linkText: "View Orders",
    },
  ];

  return (
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Welcome back! Here's what's happening with your platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${card.iconBg}`}>
                      <Icon size={24} className={card.color.split(" ")[1]} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {card.value}
                    </p>

                    {card.link && (
                      <Link
                        to={card.link}
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 mt-2"
                      >
                        {card.linkText}
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Latest Orders
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Recent orders from your platform
              </p>
            </div>

            <div className="p-6">
              {row.length > 0 ? (
                <div className="h-96">
                  <DataGrid
                    rows={row}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick
                    autoHeight
                    sx={{
                      border: "none",
                      "& .MuiDataGrid-cell": {
                        borderBottom: "1px solid #f3f4f6",
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#f9fafb",
                        borderBottom: "1px solid #e5e7eb",
                      },
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <AiOutlineShoppingCart
                    size={48}
                    className="text-gray-400 mx-auto mb-4"
                  />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No orders yet
                  </h3>
                  <p className="text-gray-600">
                    Orders will appear here once customers start purchasing.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
