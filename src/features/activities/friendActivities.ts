import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export type FriendActivity =
    | { type: "visited"; id: string; friendId: string; friendUsername: string | null; restaurantId: string; restaurantName: string; cuisine: string | null; occurredAt: string }
    | { type: "rated"; id: string; friendId: string; friendUsername: string | null; restaurantId: string; restaurantName: string; cuisine: string | null; rating: number; occurredAt: string }
    | { type: "commented"; id: string; friendId: string; friendUsername: string | null; restaurantId: string; restaurantName: string; cuisine: string | null; commentBody: string; occurredAt: string }

interface FriendActivityRow {
    activity_type: "visited" | "rated" | "commented"
    activity_id: string
    friend_id: string
    friend_username: string | null
    restaurant_id: string
    restaurant_name: string
    cuisine: string | null
    rating: number | null
    comment_body: string | null
    occurred_at: string
}

export const useFriendActivityFeed = (limit = 30) => useQuery({
    queryKey: ["friendActivityFeed", limit],
    queryFn: async () => {
        const { data, error } = await supabase.rpc("friend_activity_feed", { result_limit: limit })
        if (error) throw new Error(error.message)

        return ((data ?? []) as FriendActivityRow[]).map((r) => {
            const base = {
                id: r.activity_id,
                friendId: r.friend_id,
                friendUsername: r.friend_username,
                restaurantId: r.restaurant_id,
                restaurantName: r.restaurant_name,
                cuisine: r.cuisine,
                occurredAt: r.occurred_at,
            }
            if (r.activity_type === "rated") return { ...base, type: "rated" as const, rating: r.rating! }
            if (r.activity_type === "commented") return { ...base, type: "commented" as const, commentBody: r.comment_body! }
            return { ...base, type: "visited" as const }
        })
    },
    staleTime: 60 * 1000,
})