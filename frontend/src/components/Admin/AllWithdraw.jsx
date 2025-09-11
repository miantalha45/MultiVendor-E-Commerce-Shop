import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../server";
import { DataGrid } from "@mui/x-data-grid";
import { BsPencil } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import { BiMoneyWithdraw } from "react-icons/bi";
import Button from "@mui/material/Button";

const AllWithdraw = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");

  useEffect(() => {
    const getWithdrawRequests = () => {
      axios
        .get(`${server}/withdraw/get-all-withdraw-request`, {
          withCredentials: true,
        })
        .then((res) => {
          setData(res.data.withdraws);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    };

    getWithdrawRequests();
  }, []);

  const columns = [
    { field: "id", headerName: "Withdraw Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Shop Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "shopId",
      headerName: "Shop Id",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "status",
      headerName: "status",
      type: "text",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Request given at",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: " ",
      headerName: "Update Status",
      type: "number",
      minWidth: 130,
      flex: 0.6,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => setWithdrawData(params.row) || setOpen(true)}
            >
              <BsPencil size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const handleSubmit = async () => {
    await axios
      .put(
        `${server}/withdraw/update-withdraw-request/${withdrawData.id}`,
        {
          sellerId: withdrawData.shopId,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Withdraw request updated successfully!");
        // setData(res.data.withdraws);
        setOpen(false);
        getWithdrawRequests();
      });
  };

  const row = [];

  data &&
    data.forEach((item) => {
      row.push({
        id: item._id,
        shopId: item.seller._id,
        name: item.seller.name,
        amount: "US$ " + item.amount,
        status: item.status,
        createdAt: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Withdraw Requests
          </h2>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        {data && data.length > 0 ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BiMoneyWithdraw size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No withdraw requests
            </h3>
          </div>
        )}
      </div>
      {open && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Update Withdraw status
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <RxCross1 size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <select
                    name=""
                    id=""
                    onChange={(e) => setWithdrawStatus(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                  >
                    <option value={withdrawStatus}>
                      {withdrawData.status}
                    </option>
                    <option value={withdrawStatus}>Succeed</option>
                  </select>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllWithdraw;
