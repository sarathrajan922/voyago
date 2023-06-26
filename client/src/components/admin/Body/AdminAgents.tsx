
import React, { useEffect,useState} from 'react';
import AgentTable from './Pages/agentTable';
import axios from 'axios';
import { AgentDataApiResponse } from '../../../API/type/getAllAgents';
import BASE_URL, { urls } from '../../../config';


const AdminAgents: React.FC = () => {

  const [agentData, SetAgentData]= useState<AgentDataApiResponse[] | null>(null)

  console.log(agentData)

  useEffect(()=>{
    const getAgents = async()=>{
      const data: any = await getAllAgents()
      SetAgentData(data?.agentData)
    }
    getAgents();

  },[])


  const getAllAgents = async()=>{
    try{
      const response = await axios.get(BASE_URL+urls.ADMIN_GET_ALL_AGENTS)
      return response.data
    }catch(err){
      console.error(err)
    }
  }
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4  mt-14">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">Agents Details</p>
          </div>
         
        </div>
      <AgentTable agentData={agentData}/>
      </div>
    </div>
  );
};

export default AdminAgents;
