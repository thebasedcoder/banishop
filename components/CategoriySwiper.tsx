"use client"
import { useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { groceryItems } from "@/constants/ui";


export default function CategoriySwiper() {
  const plugin = useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );
  return (
    <section className="col-span-full w-full relative overflow-hidden bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "center",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {groceryItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg group mx-2">
                  <div className="absolute inset-0 bg-black/30 z-10 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {item.name}
                    </h3>
                    <span className="text-yellow-300 text-lg font-semibold">
                      {item.discount}
                    </span>
                    <button className="mt-4 px-4 py-1.5 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all text-sm">
                      Shop Now
                    </button>
                  </div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 text-white border-none z-20" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 text-white border-none z-20" />
        </Carousel>
      </div>
    </section>
  )
}