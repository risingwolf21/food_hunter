import { AppBar } from "@/components/ui/appbar";
import { Map, MapMarker, MapMarkerClusterGroup, MapTileLayer } from "@/components/ui/map";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/auth-context";
import { useHomeLocation } from "@/features/restaurants/useHomeLocation";
import { useNearbyRestaurants } from "@/tanstack/restaurants";
import { ChefHat } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export function MapPage() {

    const { profile } = useAuth();
    const navigate = useNavigate();
    const { home, loading } = useHomeLocation()
    const { data: restaurants = [] } = useNearbyRestaurants(home, 2000)

    if (loading)
        return <Spinner />

    if (!home)
        return <Navigate to="/profile" />

    return (
        <div className="flex flex-col h-screen">
            <AppBar
                className='!border-b !shadow-sm'
                title="Informationen"
                user={profile!}
            />
            <main className='flex-1 size-full pb-safe-bottom'>
                {
                    home && <Map
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
                                        icon={<ChefHat />}
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
            </main>
        </div>
    )
}