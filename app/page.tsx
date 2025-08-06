import CategoriySwiper from "@/components/CategoriySwiper";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Category from "@/components/products/Category";
import { PopularProductsSwiper } from "@/components/products/PoularProductSwiper";

export default function Home() {


  return (
    <>
      <Header />
      <main className="grid grid-cols-24">
        {/* Swiper Section - Now with constrained height */}
        <CategoriySwiper />

        <PopularProductsSwiper />

        <Category />
        <Footer />
      </main>
    </>
  );
}