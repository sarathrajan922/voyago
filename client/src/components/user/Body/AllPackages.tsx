import React, { useEffect, useState } from "react";
import { userGetAllPackges } from "../../../features/axios/api/user/userGetAllPackages";
import { Link } from "react-router-dom";
import { GetALLPackagesApiResponse } from "../../../API/type/getAllPackageAgent";

const AllPackages: React.FC = () => {
  const [packages, SetPackages] = useState <GetALLPackagesApiResponse[] | null>(null);

  console.log(packages);
  useEffect(() => {
    const asyncfun = async () => {
      await userGetAllPackges()
        .then((response) => {
          SetPackages(response?.result);
        })
        .catch((error: any) => {
          console.error(error.message);
        });
    };
    asyncfun();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
        <div className=" flex flex-col justify-evenly  p-10 md:p-12 mb-8">
          <h2 className="text-center text-gray-900 dark:text-white text-xl md:text-4xl font-extrabold mb-2">
            Recommended <span className="text-blue-800">Domestic </span>Holiday
            Packages
          </h2>

          <div className="grid lg:grid-cols-3 justify-items-center ">
            {/* loop this div */}

            {
                packages && packages?.map((doc)=>{
                    return (
                      
                        
                       
                        <Link to={`package-details/${doc?._id}`}>
                        
                      
                        <div className="py-5 px-2 max-h-[40rem]">
                        <div className="rounded overflow-hidden hover:shadow-lg">
                          <img
                            src={doc?.images}
                            alt=""
                          />
                          <div className="py-3 px-3 text-center">{doc?.packageName}</div>
                        </div>
                      </div>
                     
                      </Link>
                      
                    )
                })
            }
           

            {/* <div className="py-5 px-2 max-h-[40rem]">
              <div className="rounded overflow-hidden hover:shadow-lg">
                <img
                  src="https://images.freeimages.com/images/large-previews/bb1/travel-2-1474136.jpg"
                  alt=""
                />
                <div className="py-3 px-3 text-center">Heading 2</div>
              </div>
            </div>

            <div className="py-5 px-2 max-h-[40rem]">
              <div className="rounded overflow-hidden hover:shadow-lg">
                <img
                  src="https://images.freeimages.com/images/large-previews/096/the-creek-dubai-uae-1452529.jpg"
                  alt=""
                />
                <div className="py-3 px-3 text-center">Heading 3</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllPackages;
