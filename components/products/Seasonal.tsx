import { CarouselItem, Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { SeasonalProductCard } from "./SeasonalProductCard";

export default function Seasonal() {
  return (
    <section className="col-span-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Summer Favorites</h2>
        <div className="relative">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {[
                {
                  name: "Watermelons",
                  price: "$4.99",
                  image: "https://images.unsplash.com/photo-1563114775-a5635f07e6b2",
                  season: "Summer"
                },
                {
                  name: "Ice Cream",
                  price: "$3.49",
                  image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
                  season: "Summer"
                },
                {
                  name: "BBQ Meat Pack",
                  price: "$12.99",
                  image: "https://images.unsplash.com/photo-1558030006-450675393462",
                  season: "Summer"
                },
                {
                  name: "Fresh Corn",
                  price: "$0.50",
                  image: "https://images.unsplash.com/photo-1601593768790-1a6b2a2101db",
                  season: "Summer"
                },
                {
                  name: "Iced Tea",
                  price: "$2.99",
                  image: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256",
                  season: "Summer"
                }
              ].map((item) => (
                <CarouselItem key={item.name} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-2">
                    <SeasonalProductCard
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      season={item.season}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}