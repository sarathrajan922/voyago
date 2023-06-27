/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import { AgentDataApiResponse } from "../../../../API/type/getAllAgents";

interface AgentTableProps{
    agentData: AgentDataApiResponse[] | null;
}

const AgentTable: React.FC<AgentTableProps> =({agentData})=>{
    console.log(agentData)
    return (
        <>
        
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead className="text-xs text-gray-700  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3 ">
                    SL.NO
                </th>
                <th scope="col" className="px-6 py-3">
                    Agent Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Mobile
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>

        <tbody>
            {
                agentData?.map((x:any, index:any)=>{
                    return (<tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {index+1}
                    </th>
                    <td className="px-6 py-4">
                       {x.firstName+" "+x.lastName}
                    </td>
                    <td className="px-6 py-4">
                        {x.email}
                    </td>
                    <td className="px-6 py-4">
                        {x.mobile}
                    </td>
                    <td className="px-6 py-4">
                      
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    </td>
                </tr>)
                })
            }
        </tbody>
    </table>
</div>


{/* <!-- Previous Button --> */}
<div className="flex  justify-center mt-10">
<a href="#" className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
  <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
  Previous
</a>
<a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
  Next
  <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
</a>
</div>
        </>
    )

}

export default AgentTable;









