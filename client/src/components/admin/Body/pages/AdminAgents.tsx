import React from "react";
import AgentTable from "../Tables/agentTable";
import PageTitle from "../../../common/Headings";

const AdminAgents: React.FC = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
        
        <PageTitle title="Agent Details"/>
        <AgentTable />
      </div>
    </div>
  );
};

export default AdminAgents;
