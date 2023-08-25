import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Error:React.FC = ()=>{
  const [url,setUrl] = useState<string>('')
  useEffect(()=>{
    setUrl(window.location.href)
  },[])
    return (
        <>
     <section className="my-28 mb-44 dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-screen-xl lg:pt-0">
          <div className="flex flex-col h-[35rem] items-center justify-center lg:flex-row lg:justify-center">
            <div className="text-center mt-32 lg:mt-0 lg:pr-10 ">
              <h1 className="text-2xl font-bold">Invalid URL!</h1>
              <p className="text-xm">Please make sure you've entered a valid web address <span className="text-red-400">{url}</span> and try again.</p>
              <Link to='/' className="btn border-t-indigo-500 text-blue-500">Home</Link>
            </div>
            <div className="w-full lg:w-1/2 lg:my-0 md:my-5">
              <img
                className="w-full h-auto my-20 mb-10 lg:my-0 md:my-5 lg:max-w-lg mx-auto"
                src="https://res.cloudinary.com/dk4darniv/image/upload/v1692387986/animated%20svg/oops-404-error-with-a-broken-robot-animate_dach3l.svg"
                alt="svg logo"
              />
            </div>
          </div>
        </div>
      </section>
      
        </>
    )
}

export default Error;