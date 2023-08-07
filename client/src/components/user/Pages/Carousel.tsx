/* eslint-disable jsx-a11y/img-redundant-alt */

import React from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
 
// export default function ManiCarousel() {
//   return (
//     <Carousel className="rounded-xl">
//       <div className="relative h-fit w-full">
//         <img
//           src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
//           alt="image 1"
//           className="h-fit w-full object-cover"
//         />
//         <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
//           <div className="w-3/4 text-center md:w-2/4">
//             <Typography
//               variant="h1"
//               color="white"
//               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
//             >
//               The Beauty of Nature
//             </Typography>
//             <Typography
//               variant="lead"
//               color="white"
//               className="mb-12 opacity-80"
//             >
//               It is not so much for its beauty that the forest makes a claim
//               upon men&apos;s hearts, as for that subtle something, that
//               quality of air that emanation from old trees, that so
//               wonderfully changes and renews a weary spirit.
//             </Typography>
//             <div className="flex justify-center gap-2">
//               <Button size="lg" color="white">
//                 Explore
//               </Button>
//               <Button size="lg" color="white" variant="text">
//                 Search
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="relative h-full w-full">
//         <img
//           src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
//           alt="image 2"
//           className="h-full w-full object-cover"
//         />
//         <div className="absolute inset-0 grid h-full w-full items-center bg-black/75">
//           <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
//             <Typography
//               variant="h1"
//               color="white"
//               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
//             >
//               The Beauty of Nature
//             </Typography>
//             <Typography
//               variant="lead"
//               color="white"
//               className="mb-12 opacity-80"
//             >
//               It is not so much for its beauty that the forest makes a claim
//               upon men&apos;s hearts, as for that subtle something, that
//               quality of air that emanation from old trees, that so
//               wonderfully changes and renews a weary spirit.
//             </Typography>
//             <div className="flex gap-2">
//               <Button size="lg" color="white">
//                 Explore
//               </Button>
//               <Button size="lg" color="white" variant="text">
//                 Search
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>


//       <div className="relative h-full w-full">
//         <img
//           src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
//           alt="image 3"
//           className="h-full w-full object-cover"
//         />
//         <div className="absolute inset-0 grid h-full w-full items-end bg-black/75">
//           <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
//             <Typography
//               variant="h1"
//               color="white"
//               className="mb-4 text-3xl md:text-4xl lg:text-5xl"
//             >
//               The Beauty of Nature
//             </Typography>
//             <Typography
//               variant="lead"
//               color="white"
//               className="mb-12 opacity-80"
//             >
//               It is not so much for its beauty that the forest makes a claim
//               upon men&apos;s hearts, as for that subtle something, that
//               quality of air that emanation from old trees, that so
//               wonderfully changes and renews a weary spirit.
//             </Typography>
//             <div className="flex gap-2">
//               <Button size="lg" color="white">
//                 Explore
//               </Button>
//               <Button size="lg" color="white" variant="text">
//                 Gallery
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Carousel>
//   );
// }





interface CarouselProps {
  images: Record<string, string>; // Define the type for the 'images' object
}

export const SecondaryCarousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <div
      id="default-carousel"
      className="relative w-full h-full mt-2"
      data-carousel="slide"
    >
      {/* Carousel wrapper */}
      <div className="relative h-72 overflow-hidden  md:h-96">
        {Object.keys(images).map((key, index) => (
          <div
            className="hidden duration-700 ease-in-out"
            data-carousel-item
            key={index}
          >
         
            <img
              src={images[key]}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Carousel Image ${index + 1}`}
            />
          </div>
        ))}
      
         <div className="absolute z-20 inset-0 grid h-full w-full  items-center bg-black/75">
          <div className="w-3/4 pl-12 md:w-3/4 md:pl-20 lg:pl-24">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-xl md:text-3xl lg:text-4xl"
            >
              Make Your Trip Easy
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 md:text-xl text-sm"
            >
              It is not so much for its beauty that the forest makes a claim
              upon men&apos;s hearts, as for that subtle something, that
              quality of air that emanation from old trees
            </Typography>
            <div className="flex gap-2">
              <Button size="sm" color="white">
                Explore
              </Button>
                <Link to='/search'>
              <Button size="sm" color="white" variant="text">
                 Search
              </Button>
                </Link>
            </div>
          </div>
        </div>






      </div>
      {/* Slider indicators */}
      <div className="absolute  flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {Object.keys(images).map((key, index) => (
          <button
            type="button"
            className={`w-3 h-3 rounded-full${index === 0 ? " bg-white" : ""}`}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
            key={index}
          ></button>
        ))}
      </div>
      {/* Slider controls */}
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        {/* Previous button content */}
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        {/* Next button content */}
      </button>
    </div>
  );
};


