import AllPackages from "./AllPackages";
import MainCarousel, { SecondaryCarousel } from "./Carousel";
import TrendingPackages from "./TrendingPackages";

export default function Body() {
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
        <TrendingPackages/>

        <AllPackages/>
    
    </>
  );
}
