import { fetchNearbyRestaurants, fetchRestaurant, upsertRestaurantAndCreateVisit, type PlaceDetail } from "@/features/restaurants/geoapify"
import type { RestaurantFilters } from "@/features/restaurants/RestaurantFilterSheet";
import type { HomeLocation } from "@/features/restaurants/useHomeLocation";
import queryClient from "@/lib/queryclient";
import { useMutation, useQuery } from "@tanstack/react-query"

export const RESTAURANTS_QUERY_KEYS = {
    all: ['restaurants'] as const,
    nearby: (lat: number, lng: number, filters: RestaurantFilters) => [...RESTAURANTS_QUERY_KEYS.all, 'nearby', lat, lng, filters.radiusMeters, ...filters.cuisines] as const,
    restaurant: (placeId: string) => [...RESTAURANTS_QUERY_KEYS.all, 'restaurant', placeId] as const,
}

export const useNearbyRestaurants = (home: HomeLocation | null, filters: RestaurantFilters, userId: string | null) => useQuery({
    queryKey: RESTAURANTS_QUERY_KEYS.nearby(home?.lat ?? 0, home?.lng ?? 0, filters),
    enabled: !!home && !!userId,
    staleTime: 1000 * 60 * 5, // 5 Minuten
    queryFn: async () => {
        const result = await fetchNearbyRestaurants(home?.lat ?? 0, home?.lng ?? 0, filters, userId!)

        return result ?? []
    }
});

export const useRestaurant = (placeId: string, userId?: string | null) => useQuery({
    queryKey: RESTAURANTS_QUERY_KEYS.restaurant(placeId),
    staleTime: 1000 * 60 * 60, // 5 Minuten
    enabled: !!userId,
    queryFn: async () => {
        const result = await fetchRestaurant(placeId, userId!)
        console.log("fetchRestaurant", result)
        return result
    }
});

export const useMarkVisited = (userId: string) => useMutation({
    mutationFn: (place: PlaceDetail) => upsertRestaurantAndCreateVisit(userId, place),
    onSuccess: ({ place }) => {
        queryClient.invalidateQueries({ queryKey: ["visits"] })
        queryClient.invalidateQueries({ queryKey: RESTAURANTS_QUERY_KEYS.restaurant(place.placeId) })
    },
})