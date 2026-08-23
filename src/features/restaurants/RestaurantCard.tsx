import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Restaurant } from "./geoapify"
import { useNavigate } from "react-router-dom"

interface Props {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: Props) {
  const navigate = useNavigate()
  const km = ((restaurant.distanceMeters ?? 0) / 1000).toFixed(1)

  return (
    <Card onClick={() => navigate(`/restaurant/${restaurant.placeId}`)} className="cursor-pointer">
      <CardContent className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate font-medium">{restaurant.name}</p>
            {restaurant.cuisine && (
              <Badge variant="secondary" className="shrink-0">
                {restaurant.cuisine}
              </Badge>
            )}
          </div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="size-3" />
            {km} km {restaurant.address ? `· ${restaurant.address}` : ""}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
