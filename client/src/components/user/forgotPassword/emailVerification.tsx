import { Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { userRequestOTP } from "../../../features/axios/api/user/userRequestOTP";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const EmailVerificationComponent: React.FC = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState<any>('')
    const [ErrorMsg,setErrorMsg]=useState<string | null>(null)
    const handleInputChange = (e:any)=>{
        setEmail(e.target.value)
    }
    

    function isEmailValid(email:string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    useEffect(()=>{
        setErrorMsg(null)
    },[email])

    const notify = (msg: string, type: string) => {
        type === "error"
          ? toast.error(msg, { position: toast.POSITION.TOP_RIGHT })
          : toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
      };

    const handleSubmit = ()=>{
        if(isEmailValid(email)){
            // call api for sent otp
            userRequestOTP(email).then((res)=>{
                notify('OTP sent to your email!','success')
                //naviage to the enter OTP page
                navigate(`/otp-verification/${email}`)
            }).catch((err:any)=>{
                notify(err.message,'error')
            })
        }else{
            setErrorMsg('Invalid email')
        }
    }
      

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
        <img
          className="mx-auto h-10 w-auto rounded-full bg-slate-700"
          src="https://res.cloudinary.com/dk4darniv/image/upload/v1690722658/voyago%20logo/voyago-high-resolution-logo-color-on-transparent-background_1_joe0sz.webp"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Verifiy Your Email
        </h2>
      </div>
 <ToastContainer/>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex-col justify-center">
        <div>
          <Input
          value={email}
            type="email"
            placeholder="Email Address"
            className="!border !border-blue-gray-50 bg-white text-blue-gray-500 shadow-lg shadow-blue-gray-900/5 ring-4 ring-transparent placeholder:text-blue-gray-200 focus:!border-blue-500 focus:!border-t-blue-500 focus:ring-blue-500/20"
            labelProps={{
              className: "hidden",
            }}
            required
            onChange={handleInputChange}
            containerProps={{ className: "min-w-[100px]" }}
          />
        </div>
        <span className="text-red-500">{ErrorMsg}</span>
        <div className="items-center m-5 ms-[35%] ">
          <button onClick={handleSubmit} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              SENT OTP
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationComponent;
