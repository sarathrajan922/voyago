import UnverifiedAgentsTable from "../Tables/UnverifiedAgentsTable";

const AdminAgentVerification: React.FC = () => {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  rounded-lg dark:border-gray-700 mt-14">
        <UnverifiedAgentsTable />
      </div>
    </div>
  );
};

export default AdminAgentVerification;
