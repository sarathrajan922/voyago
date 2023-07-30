import React from "react";
import BasicDetails from "../AdminComponents/AdminDashBasicDetails";
import SalesChart from "../Charts/SalesCharts";
import UserChart from "../Charts/UserCharts";
import AdminDashBoardHead from "../AdminComponents/AdminDashBoardHeading";

const AdminDash: React.FC = () => {
  return (
    <div className="p-4 sm:ml-64 ">
      <div className="p-4  mt-14 shadow-lg shadow-blue-gray-400">
        
        <AdminDashBoardHead/>
        <BasicDetails/>

        <div className="grid grid-col-2 my-7">
          {/* here user chart component */}

          <div className="flex">
            <div className="mr-10">
              <div>
                <h1>Bookings</h1>
              </div>

              <SalesChart />
            </div>
            <div className="ms-10 ">
              <div>
                <h1>Users</h1>
              </div>
              <UserChart />
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AdminDash;
