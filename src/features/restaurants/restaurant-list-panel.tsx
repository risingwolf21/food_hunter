import { useNavigate } from "react-router-dom"
import { ChefHat, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Restaurant } from "@/features/restaurants/geoapify"

interface Props {
    restaurants: Restaurant[]
}

export const RestaurantListPanel = ({ restaurants }: Props) => {
    const navigate = useNavigate()

    if (restaurants.length === 0) {
        return (
            <p className="p-4 text-sm text-muted-foreground">
                Keine Restaurants im gewählten Umkreis/Filter gefunden.
            </p>
        )
    }

    return (
        <div className="space-y-2 overflow-y-auto p-3">
            {restaurants
                .slice()
                .sort((a, b) => (a.distanceMeters ?? Infinity) - (b.distanceMeters ?? Infinity))
                .map((r) => (
                    <Card
                        key={r.placeId}
                        className={cn("cursor-pointer py-0", r.visited && "opacity-70")}
                        onClick={() => navigate(`/restaurant/${r.placeId}`)}
                    >
                        <CardContent className="flex items-center gap-3 px-4 py-3">
                            <ChefHat className={cn("size-5 shrink-0", r.visited && "fill-amber-400 text-amber-500")} />
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="truncate font-medium">{r.name}</p>
                                    {r.cuisine && (
                                        <Badge variant="secondary" className="shrink-0 capitalize">
                                            {r.cuisine}
                                        </Badge>
                                    )}
                                </div>
                                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <MapPin className="size-3 shrink-0" />
                                    {r.distanceMeters !== null ? `${(r.distanceMeters / 1000).toFixed(1)} km` : null}
                                    {r.address ? ` · ${r.address}` : ""}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
        </div>
    )
}