import Chart from "react-apexcharts";
import React, { useEffect, useState } from "react";
import { getAllBookinStat } from "../../../../features/axios/api/admin/adminGetBookingStat";

const SalesChart = () => {
  
  const [series, setSeries] = useState([]);
  useEffect(()=>{
     getAllBookinStat().then((response)=>{
      setSeries([
        {
          name:"No:of Booking",
          data: response
        }
      ])
     })
  },[])
  const [option, setOption] = useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'],
    },
  });



  return (
    <div className="w-full h-auto">

    
    <Chart
      options={option}
      series={series}
      type="line"
      
    />
    </div>
  );
};

export default SalesChart;
