import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UnverifiedAgentsApiResponse } from "../../../../API/type/getAllUnverifiedAgents";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
} from "@material-tailwind/react";
import ViewIdProof from "../pages/ViewIdProof";
import { useState, useEffect } from "react";

import { adminUnVerifedAgents } from "../../../../features/axios/api/admin/adminGetAllUnVerifiedAgents";

const TABLE_HEAD = ["Member", "Status", "Document"];

const UnverifiedAgentsTable: React.FC = () => {
  const [agentData, SetAgentData] = useState<
    UnverifiedAgentsApiResponse[] | null
  >(null);
  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.BOTTOM_RIGHT })
      : toast.success(msg, { position: toast.POSITION.BOTTOM_RIGHT });
  };

  useEffect(() => {
    const getAgents = async () => {
      const data: any = await getAllUnverifiedAgents();
      SetAgentData(data?.result);
    };
    getAgents();
  }, []);
  const getAllUnverifiedAgents = async () => {
    return await adminUnVerifedAgents()
      .then((response) => {
        return response;
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
  };

  return (
  <Card className="h-full w-full">
  <CardHeader floated={false} shadow={false} className="rounded-none">
    <div className="mb-8 flex items-center justify-between gap-8">
      <div>
        <Typography variant="h5" color="blue-gray">
          Agent Verificatoin List
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          See information about all unverified Agent
        </Typography>
      </div>
    </div>
   
  </CardHeader>
    {agentData && agentData.length ? <>
  <CardBody className="overflow-scroll px-0">
      <table className="mt-4 w-full min-w-max table-auto text-left">
<thead>
<tr>
  {TABLE_HEAD.map((head) => (
    <th
      key={head}
      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
    >
      <Typography
        variant="small"
        color="blue-gray"
        className="font-normal leading-none opacity-70"
      >
        {head}
      </Typography>
    </th>
  ))}
</tr>
</thead>
<tbody>
{agentData?.map((x, index) => {
  //   const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

  return (
    <tr key={index}>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <Avatar src={x.idProof_img} alt="" size="sm" />
          <div className="flex flex-col">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {x.firstName + " " + x.lastName}
            </Typography>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal opacity-70"
            >
              {x.email}
            </Typography>
          </div>
        </div>
      </td>

      <td className="p-4">
        <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
          <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
          Not verified
        </span>
      </td>
      <td className="p-4">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <ViewIdProof idImg={x.idProof_img} agentId={x._id} />
        </Typography>
      </td>
    </tr>
  );
})}
</tbody>
</table> 

    

  </CardBody>
  <ToastContainer />

  <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
    <Typography variant="small" color="blue-gray" className="font-normal">
      Page 1 of 10
    </Typography>
    <div className="flex gap-2">
      <Button variant="outlined" color="blue-gray" size="sm">
        Previous
      </Button>
      <Button variant="outlined" color="blue-gray" size="sm">
        Next
      </Button>
    </div>
  </CardFooter>
    </> : <div className="ms-5 text-xl text-green-600">NO! Verification Pending,All agents are Verified!</div>
    }


</Card>

    
  );
};

export default UnverifiedAgentsTable;
