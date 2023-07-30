import React from "react";

const AgentDashBoardHeading: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="flex items-center justify-around h-16 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl font-bold text-black dark:text-gray-500">
          Agent DashBoard
        </p>
      </div>
    </div>
  );
};

export default AgentDashBoardHeading;
