import AlertDrawer from "./AlertDrawer";
import AllPackages from "./AllPackages";
import { SecondaryCarousel } from "./Carousel";
import TrendingPackages from "./TrendingPackages";
 
import {
  BellIcon
} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";

export default function Body() {
 const [isAlertOpen,setIsAlertOpen] = useState<boolean | null>(null)
  const AlertHandler = ()=>{
   setIsAlertOpen(true)
  //  setIsAlertOpen(false)
  setTimeout(()=>{
    setIsAlertOpen(false)
    },6000)
  }

  const [images,setImages]= useState({
  img1:'',
  img2:'',
  img3:'',
  img4:'',
  img5:''

  })

  useEffect(()=>{
   setImages({
    img1: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090056/travel%20images/palace-530055_cfxw6t.jpg",
    img2: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090054/travel%20images/hamburg-3846525_lbjedm.jpg",
    img3: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090045/travel%20images/bora-bora-3023437_swatbg.jpg",
    img4: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090045/travel%20images/maldives-1993704_bpstsb.jpg",
    img5: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090044/travel%20images/beach-1236581_gfx35d.jpg",

   })
  },[])
  


  // const images = {
  //   img1: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090056/travel%20images/palace-530055_cfxw6t.jpg",
  //   img2: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090054/travel%20images/hamburg-3846525_lbjedm.jpg",
  //   img3: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090045/travel%20images/bora-bora-3023437_swatbg.jpg",
  //   img4: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090045/travel%20images/maldives-1993704_bpstsb.jpg",
  //   img5: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090044/travel%20images/beach-1236581_gfx35d.jpg",
  // };
  return (
    <>
      <SecondaryCarousel images={images} />
      {/* <MainCarousel/> */}
   <div className="w-11 h-11 bg-light-blue-400 rounded-full ms-[1rem] lg:ms-[3rem] mt-[1rem] fixed ">

        <div onClick={AlertHandler} className="p-1 " style={{ cursor: 'pointer' }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg>

        </div>
   </div>
        
      {isAlertOpen && isAlertOpen ? <AlertDrawer/> : '' }
      <TrendingPackages />

      <AllPackages />
    </>
  );
}
