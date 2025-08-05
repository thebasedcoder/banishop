import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function ProductCard({
  name,
  price,
  image,
  category
}: {
  name: string
  price: string
  image: string
  category: string
}) {
  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-all">
      <CardHeader className="p-0 relative aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <span className="text-xs text-gray-500 uppercase">{category}</span>
        <h3 className="font-medium mt-1">{name}</h3>
        <p className="text-green-600 font-bold mt-2">{price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}