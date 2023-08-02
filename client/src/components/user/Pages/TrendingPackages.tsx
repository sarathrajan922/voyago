import React from "react";

const TrendingPackages: React.FC = ()=>{
    return (
        <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className=" flex flex-col justify-evenly  p-10 md:p-12 mb-8">
            <h2 className="text-center text-gray-900 dark:text-white text-xl md:text-4xl font-extrabold mb-2">
              Top <span  className="text-blue-800">trending</span> packages
            </h2>

            <div className="grid lg:grid-cols-3 justify-items-center ">
              {/* loop this div */}
              <div className="py-5 px-2 max-h-[40rem]">
                <div className="rounded overflow-hidden hover:shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1602828889956-45ec6cee6758?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
                    alt=""
                  />
                  <div className="py-3 px-3 text-center">Dubai</div>
                </div>
              </div>

              <div className="py-5 px-2 max-h-[40rem]">
                <div className="rounded overflow-hidden hover:shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1560625693-36619f571dca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1330&q=80"
                    alt=""
                  />
                  <div className="py-3 px-3 text-center">New York</div>
                </div>
              </div>

              <div className="py-5 px-2 max-h-[40rem]">
                <div className="rounded overflow-hidden hover:shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1505881402582-c5bc11054f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
                    alt=""
                  />
                  <div className="py-3 px-3 text-center">Maldives</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}


export default TrendingPackages