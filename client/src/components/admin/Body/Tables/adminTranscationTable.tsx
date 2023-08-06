import { useEffect, useState } from "react";
import PageTitle from "../../../common/Headings";
import { getRevenue } from "../../../../features/axios/api/admin/adminGetRevenue";
import { ToastContainer, toast } from "react-toastify";



const RevenueTransactionTable:React.FC = ()=>{
 const [transcationData ,setTranscationData] = useState<any>(null);
 const [currentPage, setCurrentPage] = useState(1);
 const [itemsPerPage] = useState(4);
 const [revenue,setRevnue]= useState<any>(null)

 useEffect(()=>{
    getRevenue().then((response)=>{
        setTranscationData(response.data.reverse())
        setRevnue(response.adminRevenue)

    })
 },[])
 console.log(transcationData)
 console.log(revenue)
 const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

//   const notify = (msg: string, type: string) => {
//     type === "error"
//       ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
//       : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
//   };


    return (
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700  uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3 ">
                  SL.NO
                </th>
                <th scope="col" className="px-6 py-3">
                  user Name
                </th>
                <th scope="col" className="px-6 py-3">
                  total
                </th>
                <th scope="col" className="px-6 py-3">
                  Income
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Action
                </th> */}
              </tr>
            </thead>
  
            <tbody>
              {transcationData
                ?.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((x: any, index: any) => {
                  return (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">
                        {x.firstName + " " + x.lastName}
                      </td>
                      <td className="px-6 py-4 text-blue-400">{x.total.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}</td>
                      <td className="px-6 py-4 text-green-400">{x.adminProfit.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}  ++</td>
                      {/* <td className="px-6 py-4">
                        block
                      </td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
  
        {/* <!-- Previous Button --> */}
        <div className="flex justify-center mt-10">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 mr-3 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Previous
            {/* Previous button content */}
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-xs font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            onClick={goToNextPage}
            disabled={
              currentPage === Math.ceil(transcationData?.length ?? 0 / itemsPerPage)
            }
          >
            Next
            {/* Next button content */}
          </button>
          <ToastContainer />
        </div>
      </>
    )
}

export default RevenueTransactionTable;