import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

export const VISITS_QUERY_KEYS = {
    all: ['visits'] as const,
    profile: (userId: string) => [...VISITS_QUERY_KEYS.all, 'restaurant', userId] as const,
}

export const useProfileVisits = (userId: string) => useQuery({
    queryKey: VISITS_QUERY_KEYS.profile(userId),
    staleTime: 1000 * 60 * 5, // 5 Minuten
    queryFn: async () => {
        const result = await supabase.from("visits").select("*, restaurants(*)").eq("user_id", userId);

        return result.data ?? []
    }
});