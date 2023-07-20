
import React from 'react';

import SalesChart from './Charts/SalesCharts';
import UserChart from './Charts/UserCharts';




const AdminDash: React.FC = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">Admin DashBoard</p>
          </div>
        </div>
        <div className='grid grid-col-2 my-7'>
          
          {/* here user chart component */}
     <div className='flex'  >
      <div className='mr-10'>
        <div>
          <h1>Bookings</h1>
        </div>

          <SalesChart/>
      </div>
      <div className='ms-10 '>
      <div >
          <h1>Users</h1>
        </div>
          <UserChart/>
      </div>
     </div>
         
        
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
