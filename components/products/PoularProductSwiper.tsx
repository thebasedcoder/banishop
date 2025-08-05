"use client"
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const popularProducts = [
  {
    id: 1,
    name: "Organic Avocados",
    price: "$2.99",
    originalPrice: "$3.49",
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: 2,
    name: "Greek Yogurt",
    price: "$3.29",
    image: "https://images.unsplash.com/photo-1577047535582-3da49386b5a1",
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: 3,
    name: "Artisan Bread",
    price: "$4.49",
    originalPrice: "$4.99",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: 4,
    name: "Free-Range Eggs",
    price: "$3.99",
    image: "https://images.unsplash.com/photo-1587486913049-53fc88980dfa",
    rating: 4.9,
    reviewCount: 210,
  },
  {
    id: 5,
    name: "Organic Blueberries",
    price: "$5.99",
    originalPrice: "$6.49",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e",
    rating: 4.5,
    reviewCount: 78,
  },
  {
    id: 6,
    name: "Cold-Pressed Juice",
    price: "$4.29",
    image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a",
    rating: 4.4,
    reviewCount: 65,
  },
];

export function PopularProductsSwiper() {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  return (
    <section className="col-span-full py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Customer Favorites</h2>
          <a href="#" className="text-green-600 hover:underline">
            View All
          </a>
        </div>

        <div className="relative">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {popularProducts.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="p-1">
                    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                      <div className="relative aspect-square">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                        {product.originalPrice && (
                          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            SALE
                          </span>
                        )}
                      </div>
                      <div className="p-4 flex-grow">
                        <h3 className="font-medium text-sm md:text-base">
                          {product.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          {product.originalPrice ? (
                            <>
                              <span className="text-green-600 font-bold">
                                {product.price}
                              </span>
                              <span className="text-gray-400 text-sm line-through ml-2">
                                {product.originalPrice}
                              </span>
                            </>
                          ) : (
                            <span className="text-green-600 font-bold">
                              {product.price}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mt-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 md:w-4 md:h-4 ${i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">
                            ({product.reviewCount})
                          </span>
                        </div>
                      </div>
                      <div className="p-4 pt-0">
                        <Button
                          size="sm"
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-50 border" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 h-10 w-10 rounded-full bg-white shadow-md hover:bg-gray-50 border" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}