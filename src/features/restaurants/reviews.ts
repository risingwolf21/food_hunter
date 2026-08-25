import queryClient from "@/lib/queryclient";
import { supabase } from "@/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRatingSummary = (restaurantId: string | null) => useQuery({
    queryKey: ["ratingSummary", restaurantId],
    queryFn: async () => {
        if (!restaurantId) return null
        const { data, error } = await supabase
            .from("restaurant_rating_summary")
            .select("avg_rating, rating_count")
            .eq("restaurant_id", restaurantId)
            .maybeSingle()

        if (error) throw new Error(error.message)
        return { avgRating: data?.avg_rating ?? null, ratingCount: data?.rating_count ?? 0 }
    },
    staleTime: 5 * 60 * 1000,
})

export const useMyRating = (userId: string | undefined, restaurantId: string | null) => useQuery({
    queryKey: ["myRating", userId, restaurantId],
    queryFn: async () => {
        if (!userId || !restaurantId) return null

        const { data, error } = await supabase
            .from("ratings")
            .select("rating")
            .eq("user_id", userId)
            .eq("restaurant_id", restaurantId)
            .maybeSingle()

        if (error) throw new Error(error.message)
        return data?.rating ?? null
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
})

export const useUpsertRating = (userId: string, restaurantId: string | null) => useMutation({
    mutationFn: async (rating: number) => {
        if (!restaurantId) return null

        const { error } = await supabase
            .from("ratings")
            .upsert({ user_id: userId, restaurant_id: restaurantId, rating }, { onConflict: "user_id,restaurant_id" })
        if (error) throw new Error(error.message)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ratingSummary", restaurantId] })
        queryClient.invalidateQueries({ queryKey: ["myRating", userId, restaurantId] })
    },
})

export const useDeleteRating = (userId: string, restaurantId: string | null) => useMutation({
    mutationFn: async () => {
        if (!restaurantId) return null

        const { error } = await supabase
            .from("ratings")
            .delete()
            .eq("user_id", userId)
            .eq("restaurant_id", restaurantId)
        if (error) throw new Error(error.message)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ratingSummary", restaurantId] })
        queryClient.invalidateQueries({ queryKey: ["myRating", userId, restaurantId] })
    },
})