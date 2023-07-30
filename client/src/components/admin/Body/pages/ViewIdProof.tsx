/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Typography,
} from "@material-tailwind/react";

import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { verifyAgent } from "../../../../features/axios/api/admin/adminVerifyAgent";

interface ViewIdProofProps {
  idImg: string;
  agentId: string;
}

const ViewIdProof: React.FC<ViewIdProofProps> = ({ idImg, agentId }) => {


  const notify = (msg: string, type: string) => {
    type === "error"
      ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
      : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
  };
  const verification = async (status: Boolean, agentId: string) => {
    if(status){
      await verifyAgent(agentId)
      .then((response) => {
        notify("Agent successfully verified", "success");
        setTimeout(() => {
           // eslint-disable-next-line no-restricted-globals
           location.replace('/admin/agents-verification')
        }, 2000);
      })
      .catch((error: any) => {
        notify(error.message, "error");
      });
    }else{
      notify('Okay! agent still in the same state', 'error')
    }
   
    
  };
  return (
    <Popover>
      <PopoverHandler>
        <Button>view document</Button>
      </PopoverHandler>
      <PopoverContent className="w-100 bg-white p-0 overflow-hidden flex z-[999]">
        <div className="p-4 m-0">
          <img
            src={idImg}
            alt="image"
            className="w-full h-full object-fill mt-4 "
          />
          <div className="pt-2 mt-2 pb-3 flex justify-center">
            <a href="#" className="inline-block">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-1 capitalize text-green-900"
                onClick={() => {
                  verification(true, agentId);
                }}
              >
                <Typography>Accept</Typography>
              </Button>
            </a>
            <a href="#" className="inline-block">
              <Button
                size="sm"
                variant="text"
                className="flex items-center gap-1 capitalize text-red-600"
                onClick={() => {
                  verification(false, agentId);
                }}
              >
                <Typography>Reject</Typography>
              </Button>
            </a>
          </div>
          <ToastContainer />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ViewIdProof;
