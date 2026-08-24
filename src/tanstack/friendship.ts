import queryClient from "@/lib/queryclient"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery } from "@tanstack/react-query"

export const FRIENDSHIP_QUERY_KEYS = {
    all: ['friendship'] as const,
    list: () => [...FRIENDSHIP_QUERY_KEYS.all, 'list'] as const,
    searchAll: () => [...FRIENDSHIP_QUERY_KEYS.all, 'search'] as const,
    search: (searchValue: string) => [...FRIENDSHIP_QUERY_KEYS.all, 'search', searchValue] as const,
}

export interface Friendship {
    id: string
    status: "pending" | "accepted"
    requesterId: string
    addresseeId: string
    createdAt: string
}

export async function searchUsers(term: string) {
    const { data, error } = await supabase.rpc("search_profiles", { search_term: term })
    if (error) throw new Error(error.message)
    return data
}

export async function sendFriendRequest(userId: string, addresseeId: string) {
    const { error } = await supabase
        .from("friendships")
        .insert({ requester_id: userId, addressee_id: addresseeId })
    if (error) throw new Error(error.message)
}

export async function acceptFriendRequest(friendshipId: string) {
    const { error } = await supabase
        .from("friendships")
        .update({ status: "accepted" })
        .eq("id", friendshipId)
    if (error) throw new Error(error.message)
}

// Deckt drei Fälle ab: eigene Anfrage zurückziehen, fremde Anfrage ablehnen, Freundschaft beenden
export async function removeFriendship(friendshipId: string) {
    const { error } = await supabase.from("friendships").delete().eq("id", friendshipId)
    if (error) throw new Error(error.message)
}

interface FriendshipRow {
    id: string
    status: "pending" | "accepted"
    requester_id: string
    addressee_id: string
    requester: { id: string; username: string | null; display_name: string | null } | null
    addressee: { id: string; username: string | null; display_name: string | null } | null
}

export const useUserSearch = (searchValue: string) => useQuery({
    queryKey: FRIENDSHIP_QUERY_KEYS.search(searchValue),
    enabled: searchValue !== "",
    queryFn: async () => {
        const result = await searchUsers(searchValue);

        return result
    }
})

export const useFriendships = (userId?: string) => useQuery({
    queryKey: FRIENDSHIP_QUERY_KEYS.list(),
    queryFn: async () => {
        if (!userId) return []
        const result = await listFriendships(userId);

        return result
    }
})

export const useAcceptFriendship = () => useMutation({
    mutationFn: async (friendshipId: string) => {
        const { error } = await supabase
            .from("friendships")
            .update({ status: "accepted" })
            .eq("id", friendshipId)

        if (error) throw new Error(error.message)
    },
    onSuccess() {
        queryClient.invalidateQueries({ queryKey: FRIENDSHIP_QUERY_KEYS.list() })
        queryClient.invalidateQueries({ queryKey: FRIENDSHIP_QUERY_KEYS.searchAll() })
    },
})

export const useRequestFriendship = (userId?: string) => useMutation({
    mutationFn: async (addresseeId: string) => {

        if (!userId) throw new Error("User was not defined")

        const result = await supabase
            .from("friendships")
            .insert({ requester_id: userId, addressee_id: addresseeId })

        if (result.error) {
            throw new Error(result.error.message)
        }

        return result.data;
    },
    onSuccess() {
        queryClient.invalidateQueries({ queryKey: FRIENDSHIP_QUERY_KEYS.list() })
        queryClient.invalidateQueries({ queryKey: FRIENDSHIP_QUERY_KEYS.searchAll() })
    },
})

export const useRemoveFriendship = () => useMutation({
    mutationFn: async (friendshipId: string) => {
        const result = await supabase.from("friendships").delete().eq("id", friendshipId)

        if (result.error) {
            throw new Error(result.error.message)
        }

        return result.data;
    },
    onSuccess() {
        queryClient.invalidateQueries({ queryKey: FRIENDSHIP_QUERY_KEYS.list() })
    },
})

export async function listFriendships(userId: string) {
    const { data, error } = await supabase
        .from("friendships")
        .select(
            "id, status, requester_id, addressee_id, requester:profiles!friendships_requester_id_fkey(id, username, display_name), addressee:profiles!friendships_addressee_id_fkey(id, username, display_name)"
        )
        .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)

    if (error) throw new Error(error.message)
    const rows = (data ?? []) as unknown as FriendshipRow[]

    return rows.map((row) => ({
        friendshipId: row.id,
        status: row.status,
        isIncomingRequest: row.status === "pending" && row.addressee_id === userId,
        friend: row.requester_id === userId ? row.addressee : row.requester,
    }))
}