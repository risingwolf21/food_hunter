import { AppBar } from "@/components/ui/appbar";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/auth-context";
import { RestaurantCard } from "@/features/restaurants/RestaurantCard";
import { useHomeLocation } from "@/features/restaurants/useHomeLocation";
import { useNearbyRestaurants } from "@/tanstack/restaurants";
import { useState } from "react";
import { Navigate } from "react-router-dom";


export function ListPage() {

    const { profile } = useAuth();

    const { home, loading } = useHomeLocation()
    const { data: restaurants = [], isLoading, error } = useNearbyRestaurants(home, 2000)

    if (loading)
        return <Spinner />

    if (!home) {
        return <Navigate to="/profile" />
    }

    return (
        <div className="flex flex-col h-screen">
            <AppBar
                className='!border-b !shadow-sm'
                title="Informationen"
                user={profile!}
            />
            <main className='flex-1 size-full pb-safe-bottom'>

                {isLoading && <p className="text-sm text-muted-foreground">Lädt Restaurants von OpenStreetMap…</p>}
                {error && <p className="text-sm text-destructive">{error.message}</p>}
                {!isLoading && !error && restaurants.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        Keine Restaurants in diesem Radius gefunden. Größeren Radius versuchen?
                    </p>
                )}

                <div className="space-y-2">
                    {restaurants.map((r) => (
                        <RestaurantCard
                            key={r.placeId}
                            restaurant={r}
                        />
                    ))}
                </div>

            </main>
        </div>
    )
}