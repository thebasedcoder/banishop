"use client"
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Minus, Plus, Trash2, Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import PopularProductCard from '@/components/products/PopularProductCard'
import Link from 'next/link'

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  // Mock product data
  const product = {
    id: 1,
    name: "Organic Hass Avocados",
    description: "Premium organic Hass avocados, rich in healthy fats and nutrients. Perfect for guacamole, salads, or toast. Grown sustainably in California.",
    price: 2.99,
    originalPrice: 3.99,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "/meat.jpg",
      "/meat.jpg",
      "/meat.jpg",

    ],
    details: {
      origin: "California, USA",
      weight: "200g each",
      organic: true,
      stock: "In Stock (32 available)"
    }
  }

  // Related products
  const relatedProducts = Array(6).fill({
    id: 2,
    name: "Organic Bananas",
    price: 0.69,
    originalPrice: 0.99,
    image: "/bakery.jpg",
    rating: 4.7,
    reviewCount: 89
  })

  // Reviews
  const reviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "2 days ago",
      comment: "The avocados were perfectly ripe when they arrived! Made amazing guacamole."
    },
    {
      id: 2,
      author: "Michael Chen",
      rating: 4,
      date: "1 week ago",
      comment: "Great quality, though one was slightly overripe. Still very good overall."
    }
  ]

  const handleAddToCart = () => {
    setAddedToCart(true)
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Back button with better spacing */}
        <div className="container py-4 px-4 sm:px-6">
          <Link href={"/products"}>
            <Button variant="ghost" className="text-primary hover:bg-primary/10 px-3">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to products
            </Button>
          </Link>
        </div>

        {/* Product Section with improved grid spacing */}
        <section className="container py-6 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images with better carousel controls */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 shadow-sm">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity hover:opacity-90"
                  priority
                />
              </div>
              <Carousel className="w-full group">
                <CarouselContent className="-ml-1">
                  {product.images.map((image, index) => (
                    <CarouselItem key={index} className="pl-1 basis-1/3">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50 border transition-all hover:border-primary">
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CarouselNext className="right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Carousel>
            </div>

            {/* Product Info with better typography */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
                <div className="mt-3 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-primary">${product.price}</span>
                  {product.originalPrice && (
                    <span className="ml-3 text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>

                <p className="text-gray-700 leading-relaxed">{product.description}</p>

                <div className="space-y-3 pt-2">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex">
                      <span className="font-medium text-gray-900 w-28 capitalize">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Cart with better transitions */}
              {!addedToCart ? (
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-lg transition-colors shadow-md"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              ) : (
                <div className="flex items-center justify-between border rounded-lg p-1.5 border-primary/30 bg-primary/5">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="text-primary hover:bg-primary/10 h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    className="w-16 text-center border-0 shadow-none text-lg font-medium bg-transparent"
                    min={1}
                    max={10}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="text-primary hover:bg-primary/10 h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setAddedToCart(false)}
                    className="text-gray-500 hover:text-red-500 h-10 w-10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        <Separator className="my-6 bg-gray-100" />

        {/* Related Products with better heading */}
        <section className="container py-8 px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">You may also like</h2>
            <p className="text-gray-600 mt-1">Customers who bought this item also viewed</p>
          </div>
          <Carousel
            opts={{
              align: "start",
              slidesToScroll: 1,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-2">
              {relatedProducts.map((product, index) => (
                <CarouselItem key={index} className="pl-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <PopularProductCard {...product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 hidden sm:flex" />
            <CarouselNext className="right-2 hidden sm:flex" />
          </Carousel>
        </section>

        <Separator className="my-6 bg-gray-100" />

        {/* Reviews with better tab styling */}
        <section className="container py-8 px-4 sm:px-6">
          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-xs bg-gray-100">
              <TabsTrigger
                value="details"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Product Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-6">
              <div className="prose prose-sm sm:prose-base max-w-none">
                <h3 className="text-lg font-semibold text-gray-900">About this product</h3>
                <p className="text-gray-700">
                  Our organic Hass avocados are hand-picked at peak ripeness to ensure the best flavor and texture.
                  They're rich in healthy monounsaturated fats, fiber, and various vitamins and minerals.
                </p>
                <h3 className="text-lg font-semibold text-gray-900 mt-4">Storage Tips</h3>
                <p className="text-gray-700">
                  Store unripe avocados at room temperature. Once ripe, you can refrigerate them to slow down
                  further ripening. To speed up ripening, place in a paper bag with an apple or banana.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{review.author}</h4>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'fill-primary text-primary' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="mt-3 text-gray-700">{review.comment}</p>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="mt-6 border-primary text-primary hover:bg-primary/10"
                >
                  Write a Review
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  )
}

