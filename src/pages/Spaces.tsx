import { AnimatePresence, motion } from "motion/react";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "../lib/utils";

const Spaces = () => {
  const images = [
    {
      src: "https://picsum.photos/seed/space1/800/1200",
      alt: "Illustrations",
      title: "Block Reader",
    },
    {
      src: "https://picsum.photos/seed/space2/800/1200",
      alt: "Illustrations",
      title: "Forest Fungi",
    },
    {
      src: "https://picsum.photos/seed/space3/800/1200",
      alt: "Illustrations",
      title: "Golden Dusk",
    },
    {
      src: "https://picsum.photos/seed/space4/800/1200",
      alt: "Illustrations",
      title: "Silent Peaks",
    },
    {
      src: "https://picsum.photos/seed/space5/800/1200",
      alt: "Illustrations",
      title: "Emerald Woods",
    },
    {
      src: "https://picsum.photos/seed/space6/800/1200",
      alt: "Illustrations",
      title: "Falling Mist",
    },
    {
      src: "https://picsum.photos/seed/space7/800/1200",
      alt: "Illustrations",
      title: "Midnight Veil",
    },
    {
      src: "https://picsum.photos/seed/space8/800/1200",
      alt: "Illustrations",
      title: "Azure Ridge",
    },
    {
      src: "https://picsum.photos/seed/space9/800/1200",
      alt: "Illustrations",
      title: "Cloud Summit",
    },
  ];

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-black">
      <Carousel_006 images={images} />
    </div>
  );
};

interface Carousel_006Props {
  images: { src: string; alt: string; title: string }[];
  className?: string;
}

const Carousel_006 = ({ images, className }: Carousel_006Props) => {
  const [current, setCurrent] = useState(Math.floor(images.length / 2));
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;

    // Filter out the spacer divs to only check actual carousel items
    const items = Array.from(container.children).filter(child => child.hasAttribute('data-carousel-item'));
    
    items.forEach((child, index) => {
      const childElement = child as HTMLElement;
      const childCenter = childElement.offsetLeft + childElement.clientWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (current !== closestIndex) {
      setCurrent(closestIndex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scroll to the middle item on initial load
    const middleIndex = Math.floor(images.length / 2);
    const items = Array.from(container.children).filter(child => child.hasAttribute('data-carousel-item'));
    if (items[middleIndex]) {
      const middleElement = items[middleIndex] as HTMLElement;
      const scrollPos = middleElement.offsetLeft - (container.clientWidth / 2) + (middleElement.clientWidth / 2);
      container.scrollLeft = scrollPos;
    }
    
    handleScroll();

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        // Reduced multiplier to prevent scrolling past multiple cards
        container.scrollLeft += e.deltaY * 1.5;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [images.length]);

  return (
    <div className={cn("w-full relative flex flex-col items-center", className)}>
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="hide-scrollbar flex h-[500px] w-full overflow-x-auto snap-x snap-mandatory items-center pb-8"
      >
        {/* Spacer Start */}
        <div className="shrink-0 w-[13.5%] sm:w-[25%] md:w-[35%] lg:w-[37.5%] xl:w-[39.5%]" />
        
        {images.map((img, index) => (
          <div
            key={index}
            data-carousel-item
            className="relative flex h-[81.5%] w-[73%] sm:w-[50%] md:w-[30%] lg:w-[25%] xl:w-[21%] shrink-0 snap-center items-center justify-center px-2"
          >
            <motion.div
              initial={false}
              animate={{
                clipPath:
                  current !== index
                    ? "inset(15% 0 15% 0 round 2rem)"
                    : "inset(0 0 0 0 round 2rem)",
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full w-full overflow-hidden rounded-3xl"
            >
              <div className="relative h-full w-full border border-white/10">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full scale-105 object-cover"
                />
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              {current === index && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  exit={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -bottom-10 left-0 flex w-full items-center justify-center p-2 text-center font-medium tracking-tight text-primary"
                >
                  {img.title}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Spacer End */}
        <div className="shrink-0 w-[13.5%] sm:w-[25%] md:w-[35%] lg:w-[37.5%] xl:w-[39.5%]" />
      </div>
    </div>
  );
};

export default Spaces;
