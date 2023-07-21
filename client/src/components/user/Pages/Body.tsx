import AlertDrawer from "./AlertDrawer";
import AllPackages from "./AllPackages";
import { SecondaryCarousel } from "./Carousel";
import TrendingPackages from "./TrendingPackages";
 
import {
  BellIcon
} from "@heroicons/react/24/outline";
import {useState} from "react";

export default function Body() {
 const [isAlertOpen,setIsAlertOpen] = useState<boolean | null>(null)
  const AlertHandler = ()=>{
   setIsAlertOpen(true)
  //  setIsAlertOpen(false)
  setTimeout(()=>{
    setIsAlertOpen(false)
    },6000)
  }
  


  const images = {
    img1: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090056/travel%20images/palace-530055_cfxw6t.jpg",
    img2: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090054/travel%20images/hamburg-3846525_lbjedm.jpg",
    img3: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090045/travel%20images/bora-bora-3023437_swatbg.jpg",
    img4: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090045/travel%20images/maldives-1993704_bpstsb.jpg",
    img5: "https://res.cloudinary.com/dk4darniv/image/upload/v1687090044/travel%20images/beach-1236581_gfx35d.jpg",
  };
  return (
    <>
      <SecondaryCarousel images={images} />
      {/* <MainCarousel/> */}
   <div className="w-10 h-10 bg-light-blue-400 rounded-full ms-[1rem] lg:ms-[3rem] mt-[1rem] fixed ">

        <div onClick={AlertHandler} className="p-1" style={{ cursor: 'pointer' }}>
        <BellIcon/>
        </div>
   </div>
        
      {isAlertOpen && isAlertOpen ? <AlertDrawer/> : '' }
      <TrendingPackages />

      <AllPackages />
    </>
  );
}
