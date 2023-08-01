import {useEffect, useState} from 'react'
import Chart from "react-apexcharts";
import { getAllAgentBookingStat } from '../../../features/axios/api/agent/agentGetAllBookingStat';

const AgentSalesChart= ()=>{

  const [series, setSeries] = useState([]);
  useEffect(()=>{
    getAllAgentBookingStat().then((response)=>{
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
}


export default AgentSalesChart;