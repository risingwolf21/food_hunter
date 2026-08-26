import { useNavigate } from "react-router-dom"
import { ChefHat } from "lucide-react"
import { Map, MapMarker, MapMarkerClusterGroup, MapTileLayer } from "@/components/ui/map";
import type { Restaurant } from "@/features/restaurants/geoapify"
import type { HomeLocation } from "./useHomeLocation"

interface Props {
    restaurants: Restaurant[]
    home: HomeLocation
}

export const RestaurantMapPanel = ({ restaurants, home }: Props) => {
    const navigate = useNavigate()

    return <Map
        className='size-full'
        center={[home.lat, home.lng]}>
        <MapTileLayer />

        <MapMarker
            key={'home'}
            position={[home.lat, home.lng]}
            title={home.label ?? 'Zuhause'}
        />

        <MapMarkerClusterGroup maxClusterRadius={(zoom) => zoom * 1.25}>
            {
                restaurants.map((r) => (
                    <MapMarker
                        key={r.placeId}
                        position={[r.lat, r.lng]}
                        icon={r.visited ? <ChefHat fill="gold" /> : <ChefHat />}
                        eventHandlers={{
                            click: () => {
                                navigate(`/restaurant/${r.placeId}`)
                            },
                        }}
                    />
                ))
            }
        </MapMarkerClusterGroup>
    </Map>
}