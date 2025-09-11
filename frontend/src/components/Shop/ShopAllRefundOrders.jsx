import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../../components/Layout/Loader";
import Button from "@mui/material/Button";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getAllOrdersOfSeller } from "../../redux/actions/order";

const ShopAllRefundOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfSeller(seller._id));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
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
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  const eligibleOrders =
    orders &&
    orders.filter(
      (order) =>
        order.status === "Processing refund" ||
        order.status === "Refund Success"
    );

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex-1">
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  All Refunds
                </h2>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
                sx={{
                  border: "none",
                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid #f3f4f6",
                    fontSize: "14px",
                  },
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f9fafb",
                    borderBottom: "1px solid #e5e7eb",
                    fontSize: "14px",
                    fontWeight: 600,
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#f9fafb",
                  },
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopAllRefundOrders;
