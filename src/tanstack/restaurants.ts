import { fetchNearbyRestaurants, fetchRestaurant } from "@/features/restaurants/geoapify"
import type { HomeLocation } from "@/features/restaurants/useHomeLocation";
import { useQuery } from "@tanstack/react-query"

export const RESTAURANTS_QUERY_KEYS = {
    all: ['restaurants'] as const,
    nearby: (lat: number, lng: number, radius: number) => [...RESTAURANTS_QUERY_KEYS.all, 'nearby', lat, lng, radius] as const,
    restaurant: (placeId: string) => [...RESTAURANTS_QUERY_KEYS.all, 'restaurant', placeId] as const,
}

export const useNearbyRestaurants = (home: HomeLocation | null, radius: number) => useQuery({
    queryKey: RESTAURANTS_QUERY_KEYS.nearby(home?.lat ?? 0, home?.lng ?? 0, radius),
    enabled: !!home,
    staleTime: 1000 * 60 * 5, // 5 Minuten
    queryFn: async () => {
        const result = await fetchNearbyRestaurants(home?.lat ?? 0, home?.lng ?? 0, radius)

        return result ?? []
    }
});

export const useRestaurant = (placeId: string) => useQuery({
    queryKey: RESTAURANTS_QUERY_KEYS.restaurant(placeId),
    staleTime: 1000 * 60 * 60, // 5 Minuten
    queryFn: async () => {
        const result = await fetchRestaurant(placeId)

        console.log(result)

        return result
    }
});