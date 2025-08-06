import { Star } from "lucide-react"
import Image from "next/image"

export default function PopularProductCard({ name, price, originalPrice, image, rating, reviewCount }: {
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{name}</h3>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold text-[#E11D48]">${price}</span>
            {originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice}</span>
            )}
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-[#E11D48] text-[#E11D48]" />
            <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}