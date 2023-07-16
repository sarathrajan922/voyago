import React, { useEffect } from "react";
import { agentGetAllBookings } from "../../../features/axios/api/agent/agentGetAllBooking";


const AgentAllBookings : React.FC = ()=>{




    useEffect(()=>{
    const getAllBookings= async()=>{
        const result =  await agentGetAllBookings()
        if(result){
            console.log(result)
        }
    }   

    getAllBookings()
      
    },[])
    return (
        <div className="p-4 sm:ml-64">
     
        <div className="p-4  mt-14">
          <div className="grid grid-cols-3 gap-4 mb-4">
            
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
               All Bookings
              </p>
            </div>
          </div>
          
          
  
          {/* list of pakages */}
  
          <div className="grid lg:grid-cols-4 lg:gap-3 justify-items-center">
            {/* first card */}
  
            {/* loop this one */}
  
           
          </div>
  
          {/* <!-- Previous Button --> */}
          
        </div>
      </div>
    )
}

export default AgentAllBookings;