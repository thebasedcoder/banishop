import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"

export function PopularProductCard({
  name,
  price,
  originalPrice,
  image,
  rating
}: {
  name: string
  price: string
  originalPrice?: string
  image: string
  rating: number
}) {
  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-all border-0 shadow-sm relative">
      {originalPrice && (
        <Badge variant="destructive" className="absolute top-2 right-2 z-10">
          SALE
        </Badge>
      )}
      <CardHeader className="p-0 relative aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-white/90 px-2 py-1 rounded-full flex items-center">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center mt-2">
          <p className="text-green-600 font-bold">{price}</p>
          {originalPrice && (
            <p className="text-gray-400 text-sm line-through ml-2">{originalPrice}</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-green-600 hover:bg-green-700">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}