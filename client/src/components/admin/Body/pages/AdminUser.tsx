import React from "react";
import UserTable from "../Tables/userTable";
import PageTitle from "../../../common/Headings";

const AdminUser: React.FC = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  rounded-lg dark:border-gray-700 mt-14">
       
        <PageTitle title="User Details"/>
        <UserTable />
      </div>
    </div>
  );
};

export default AdminUser;
