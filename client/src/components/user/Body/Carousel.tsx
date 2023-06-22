import React from 'react';

interface CarouselProps {
  images: Record<string, string>; // Define the type for the 'images' object
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <div id="default-carousel" className="relative w-full" data-carousel="slide">
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {Object.keys(images).map((key, index) => (
          <div className="hidden duration-700 ease-in-out" data-carousel-item key={index}>
            <img
              src={images[key]}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt={`Carousel Image ${index + 1}`}
            />
          </div>
        ))}
        {/* Fixed-position text */}
        <div className="absolute top-1/4 left-40 transform -translate-x-1/4 -translate-y-1/4  z-20">
        <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-3xl lg:text-4xl dark:text-slate-200">MAKE YOUR TRIP <br/>EASY</h1>
        </div>
      </div>
      {/* Slider indicators */}
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {Object.keys(images).map((key, index) => (
          <button
            type="button"
            className={`w-3 h-3 rounded-full${index === 0 ? ' bg-white' : ''}`}
            aria-current={index === 0 ? 'true' : 'false'}
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

export default Carousel;
