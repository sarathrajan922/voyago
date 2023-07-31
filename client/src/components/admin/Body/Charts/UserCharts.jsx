import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getUsers } from "../../../../features/axios/api/admin/adminGetAllUsers";
import { CircleLoader } from "react-spinners";

const UserChart = () => {
    const [isload, setIsLoad] = useState(null)
  useEffect(() => {
    const getAllUsers = async () => {
      const data = await getUsers();
      setIsLoad(true)
      if(data){
        const userData = data?.userData
        let Active = 0
        let Block = 0
        userData.forEach(element => {
            if(element?.isActive){
                Active++
            }else{
                Block++
            }
        });
        setSeries([Active,Block])

  
      } 
    };
    getAllUsers();
  }, []);

  const [option, setOption] = useState({
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Active", "Blocked"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: ["#22f085", "#e01017"],
  });

  const [series, setSeries] = useState([0,0]);

  return !isload ? <div className=" w-full flex justify-center  h-full ">
  <div className="py-52">
    <CircleLoader color="#1bacbf " />
  </div>
</div> : (
    <div id="chart w-full h-auto">
      <ReactApexChart options={option} series={series} type="pie"  />
    </div>
  );
};

export default UserChart;
