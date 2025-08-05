import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function SeasonalProductCard({
  name,
  price,
  image,
  season
}: {
  name: string
  price: string
  image: string
  season: string
}) {
  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-all border-blue-50 bg-blue-50">
      <CardHeader className="p-0 relative aspect-square">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        <Badge variant="secondary" className="absolute top-2 left-2 bg-blue-100 text-blue-800">
          {season}
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-medium">{name}</h3>
        <p className="text-green-600 font-bold mt-2">{price}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
          Seasonal Offer
        </Button>
      </CardFooter>
    </Card>
  )
}