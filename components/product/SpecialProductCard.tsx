import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function SpecialProductCard({
  name,
  price,
  originalPrice,
  image,
  discount
}: {
  name: string
  price: string
  originalPrice: string
  image: string
  discount: string
}) {
  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-all border-red-100">
      <CardHeader className="p-0 relative aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        <Badge variant="destructive" className="absolute top-2 right-2">
          {discount} OFF
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-medium">{name}</h3>
        <div className="flex items-center mt-2">
          <p className="text-green-600 font-bold">{price}</p>
          <p className="text-gray-400 text-sm line-through ml-2">{originalPrice}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-red-500 hover:bg-red-600">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}