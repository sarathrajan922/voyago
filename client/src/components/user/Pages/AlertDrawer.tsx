import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getAllAlertMessage } from "../../../features/axios/api/user/userGetAllAlertMsg";
import { getAllAlertMessageApiResponse } from "../../../API/type/getAllAlertMsgApiResponse";

export default function AlertDrawer() {
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<
    getAllAlertMessageApiResponse[] | null
  >(null);
  //   const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  useEffect(() => {
    const getAllMessage = async () => {
      const data = await getAllAlertMessage();
      if (data) {
        setAlertMessage(data?.result);
      }
    };
    getAllMessage();
    setOpen(true);
  }, []);
 

  return (
    <React.Fragment>
      {/* <Button onClick={openDrawer}>Open Drawer</Button> */}
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex bg-white z-auto items-center justify-between">
        <div className="mb-1 md:mb-0">
              <a href="/" className="flex items-center">
                  <img src="https://res.cloudinary.com/dk4darniv/image/upload/v1690722658/voyago%20logo/voyago-high-resolution-logo-color-on-transparent-background_1_joe0sz.webp" className="h-10" alt="FlowBite Logo" />
                  
              </a>
          </div>
          <Typography variant="h5" color="blue-gray">
            Voyago
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>

        {alertMessage &&
          alertMessage.map((x) => {
            return (
              <div className="card hover:shadow hover:bg-gray-100 rounded">
                <span className="my-2">
                  {(
                    x?.agentDetails?.firstName +
                    " " +
                    x?.agentDetails?.lastName
                  ).toUpperCase()}
                </span>
                <Typography
                  color="gray"
                  className="mb-8 pr-4 font-normal text-red-600"
                >
                  {x?.message}
                </Typography>
              </div>
            );
          })}

        {/* <div className="flex gap-2">
            <Button size="sm">Get Started</Button>
            <Button size="sm" variant="outlined">
                Documentation
            </Button>
            </div> */}
      </Drawer>
    </React.Fragment>
  );
}
