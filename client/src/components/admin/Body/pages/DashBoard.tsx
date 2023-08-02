import React from "react";
import BasicDetails from "../AdminComponents/AdminDashBasicDetails";
import SalesChart from "../Charts/SalesCharts";
import UserChart from "../Charts/UserCharts";
import AdminDashBoardHead from "../AdminComponents/AdminDashBoardHeading";
import AgentChart from "../Charts/AgentChart";

const AdminDash: React.FC = () => {
  return (
    <div className="p-4 sm:ml-64 ">
      <div className="p-4  mt-14 shadow-lg shadow-blue-gray-400">
        
        <AdminDashBoardHead/>
        <BasicDetails/>

        <div className="flex flex-wrap my-7">
          {/* here user chart component */}

          
            <div className="flex-col w-full md:w-1/2 ">
              <div className="flex justify-center mb-2">
                <h1 className="font-bold text-xl">Bookings</h1>
              </div>

              <SalesChart />
            </div>
            <div className="flex-col w-full md:w-1/2">    
              <div className="flex justify-center mb-2">
                <h1 className="font-bold text-xl">Agent</h1>
              </div>
              <AgentChart />
            </div>

            <div className="flex-col w-full md:w-1/2">    
              <div className="flex justify-center mb-2">
                <h1 className="font-bold text-xl">Users</h1>
              </div>
              <UserChart />
              
            </div>

          
        </div>


      </div>
    </div>
  );
};

export default AdminDash;