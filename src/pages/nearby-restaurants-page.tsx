import { PageLayout } from "@/components/page-layout";
import { AppBar } from "@/components/ui/appbar";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { RestaurantListPanel } from "@/features/restaurants/restaurant-list-panel";
import { RestaurantMapPanel } from "@/features/restaurants/restaurant-map-panel";
import { type RestaurantFilters, RestaurantFilterSheet } from "@/features/restaurants/RestaurantFilterSheet";
import { useHomeLocation } from "@/features/restaurants/useHomeLocation";
import { useNearbyRestaurants } from "@/tanstack/restaurants";
import { List, MapIcon } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const DEFAULT_FILTERS: RestaurantFilters = {
    radiusMeters: 2000,
    cuisines: [],
}

export function NearbyRestaurants() {

    const [filters, setFilteres] = useState<RestaurantFilters>(DEFAULT_FILTERS)

    const { profile, user } = useAuth();
    const { home, loading } = useHomeLocation()
    const { data: restaurants = [] } = useNearbyRestaurants(home, filters, user?.id ?? null)

    if (loading)
        return <Spinner />

    if (!home)
        return <Navigate to="/profile" />

    return <Tabs defaultValue="map" className="flex h-full min-h-0 flex-col ga-0">
        <AppBar
            className='!border-b !shadow-sm'
            title="Informationen"
            user={profile!}
            actions={<RestaurantFilterSheet
                filters={filters}
                onFiltersChanged={setFilteres}
                onReset={() => setFilteres(DEFAULT_FILTERS)}
            />}
            tabs={<TabsList className="flex rounded-md border">
                <TabsTrigger
                    value="map"
                    className="flex items-center gap-1.5 rounded px-2.5 py-1 text-sm text-muted-foreground data-[selected]:bg-accent data-[selected]:text-foreground"
                >
                    <MapIcon className="size-4" />
                    Karte
                </TabsTrigger>
                <TabsTrigger
                    value="list"
                    className="flex items-center gap-1.5 rounded px-2.5 py-1 text-sm text-muted-foreground data-[selected]:bg-accent data-[selected]:text-foreground"
                >
                    <List className="size-4" />
                    Liste
                </TabsTrigger>
            </TabsList>}
        />
        <TabsContent value={"map"} className="min-h-0 flex-1 pb-safe-bottom" keepMounted>
            <RestaurantMapPanel restaurants={restaurants} home={home} />
        </TabsContent>
        <TabsContent value={"list"} className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom">
            <RestaurantListPanel restaurants={restaurants} />
        </TabsContent>
    </Tabs >
}