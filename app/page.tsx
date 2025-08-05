import CategoriySwiper from "@/components/CategoriySwiper";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Category from "@/components/product/Category";
import { PopularProductsSwiper } from "@/components/product/PoularProductSwiper";
import Seasonal from "@/components/product/Seasonal";

export default function Home() {


  return (
    <>
      <Header />
      <main className="grid grid-cols-24">
        {/* Swiper Section - Now with constrained height */}
        <Category />
        {/* <CategoriySwiper /> */}
        {/* 
        <section className="col-span-full py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">Weekly Specials</h2>
              <a href="#" className="text-green-600 hover:underline">View All</a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { name: "Organic Bananas", price: "$0.69/lb", original: "$0.99", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e" },
                { name: "Free Range Eggs", price: "$3.99", original: "$4.99", image: "https://images.unsplash.com/photo-1587486913049-53fc88980dfa" },
                { name: "Whole Grain Bread", price: "$2.49", original: "$3.29", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff" },
                { name: "Almond Milk", price: "$3.29", original: "$3.99", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150" }
              ].map((item) => (
                <div key={item.name} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
                  <div className="h-40 bg-gray-100 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">SALE</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-green-600 font-bold">{item.price}</span>
                      <span className="text-gray-400 text-sm line-through ml-2">{item.original}</span>
                    </div>
                    <button className="mt-3 w-full py-1.5 bg-green-50 text-green-600 rounded text-sm hover:bg-green-100">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
 */}
        <PopularProductsSwiper />
        <Footer />
      </main>
    </>
  );
}