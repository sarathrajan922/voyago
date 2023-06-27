import React from "react";
import UserTable from "./Pages/userTable";

const AdminUser: React.FC = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  rounded-lg dark:border-gray-700 mt-14">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              User Details
            </p>
          </div>
        </div>

        <UserTable />
      </div>
    </div>
  );
};

export default AdminUser;
