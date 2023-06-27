
import React, { useEffect, useState} from 'react';
import UnverifiedAgentsTable from './Pages/UnverifiedAgentsTable';
import axios from 'axios';
import BASE_URL, { urls } from '../../../config';

import { UnverifiedAgentsApiResponse } from '../../../API/type/getAllUnverifiedAgents';



const AdminAgentVerification: React.FC = () => {
  const [agentData , SetAgentData] = useState<UnverifiedAgentsApiResponse[] | null>(null)
console.log(BASE_URL+urls.ADMIN_GET_ALL_UNVERIFIED_AGENTS)
 console.log(agentData)
  useEffect(()=>{ 
    const getAgents = async() => {
     const data: any =  await getAllUnverifiedAgents()
     SetAgentData(data?.result) 
    }
    getAgents();
  },[])
const getAllUnverifiedAgents = async()=>{
  try{

   const response = await axios.get(BASE_URL+urls.ADMIN_GET_ALL_UNVERIFIED_AGENTS)
    
    return response.data;

  }catch(err){
    console.error(err)
  }
}

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  rounded-lg dark:border-gray-700 mt-14">
       


        <UnverifiedAgentsTable agentData={agentData}/>
       
            
        {/* <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default AdminAgentVerification;
