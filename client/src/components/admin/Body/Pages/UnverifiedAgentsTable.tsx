import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { UnverifiedAgentsApiResponse } from "../../../../API/type/getAllUnverifiedAgents";
import viewIdProof from "../popupImage";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import ViewIdProof from "../popupImage";

interface AgentTableProps {
    agentData: UnverifiedAgentsApiResponse[] | null;
}
 
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];
 
const TABLE_HEAD = ["Member", "Email", "Status", "Document"];
 
 
const UnverifiedAgentsTable: React.FC<AgentTableProps>=({agentData})=> {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Agent verification List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" color="blue-gray" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" color="blue" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input label="Search" icon={<MagnifyingGlassIcon className="h-5 w-5" />} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
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
                      <Avatar src={x.idProof_img} alt='' size="sm" />
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {x.firstName+" "+x.lastName}
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
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {x.isActive}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {x.firstName}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={x.isActive ? "online" : "offline"}
                        color={x.isActive ? "green" : "blue-gray"}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                    <ViewIdProof idImg={x.idProof_img} agentId={x._id} />

                    </Typography>
                  </td>
               
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
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
    </Card>
  );
}


export default UnverifiedAgentsTable