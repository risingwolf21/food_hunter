import queryClient from "@/lib/queryclient";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";

interface CommentRow {
    id: string
    user_id: string
    restaurant_id: string
    body: string
    created_at: string
    updated_at: string
    public_profiles: { username: string | null } | null
}

export const useComments = (restaurantId: string) => useQuery({
    queryKey: ["comments", restaurantId],
    queryFn: async () => {
        const { data, error } = await supabase
            .from("comments")
            .select("id, user_id, restaurant_id, body, created_at, updated_at, public_profiles(username)")
            .eq("restaurant_id", restaurantId)
            .order("created_at", { ascending: false })

        if (error) throw new Error(error.message)
        const rows = (data ?? []) as unknown as CommentRow[]

        return rows.map((r) => ({
            id: r.id,
            userId: r.user_id,
            username: r.public_profiles?.username ?? null,
            restaurantId: r.restaurant_id,
            body: r.body,
            createdAt: r.created_at,
            updatedAt: r.updated_at,
        }))
    },
    staleTime: 2 * 60 * 1000, // Kommentare ändern sich eher als Restaurant-Stammdaten, aber nicht sekündlich
})

export const useAddComment = (restaurantId: string) => useMutation({
    mutationFn: async ({ userId, body }: { userId: string; body: string }) => {
        const { error } = await supabase.from("comments").insert({ user_id: userId, restaurant_id: restaurantId, body })
        if (error) throw new Error(error.message)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", restaurantId] })
    },
})

export const useDeleteComment = (restaurantId: string) => useMutation({
    mutationFn: async (commentId: string) => {
        const { error } = await supabase.from("comments").delete().eq("id", commentId)
        if (error) throw new Error(error.message)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["comments", restaurantId] })
    },
})