import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const desktopImages: string[] = [
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
  "https://images.pexels.com/photos/323775/pexels-photo-323775.jpeg",
  "https://images.pexels.com/photos/259962/pexels-photo-259962.jpeg",
  "https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg",
];

const mobileImages: string[] = [
  "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
  "https://images.pexels.com/photos/276224/pexels-photo-276224.jpeg",
  "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
];

const ImageSlider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const images = isMobile ? mobileImages : desktopImages;

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [images]);

  return (
    <div className={`w-full mx-auto ${isMobile ? "px-4 mt-16" : "px-48 mt-16"}`}>

      {/*  DIFFERENT ASPECT RATIOS */}
      <div
        className={
          `relative w-full overflow-hidden rounded-2xl shadow-xl ` +
          (isMobile ? "aspect-[4/1.6]" : "aspect-[16/4]")
        }
      >
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="min-w-full h-full">
              <img
                src={src}
                className="w-full h-full object-cover select-none rounded-2xl"
                alt={`Slide ${i}`}
              />
            </div>
          ))}
        </div>

        {/*  ARROWS ONLY ON DESKTOP */}
        {!isMobile && (
          <>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
