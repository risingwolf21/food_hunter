import { useAuth } from "@/contexts/auth-context"
import queryClient from "@/lib/queryclient"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery } from "@tanstack/react-query"

export const PROFILE_QUERY_KEYS = {
    all: ['profiles'] as const,
    user: (userId: string) => [...PROFILE_QUERY_KEYS.all, 'list', userId] as const
}

export const useProfile = () => {
    const { session } = useAuth();

    const result = useQuery({
        queryKey: PROFILE_QUERY_KEYS.user(session?.user.id ?? "undefined"),
        queryFn: async () => {
            const { data } = await supabase.from("profiles").select("*").eq("id", session?.user.id ?? "").maybeSingle();

            if (data === null) {
                throw new Error("Could not load profile")
            }

            return data;
        }
    })

    return {
        ...result
    }

}
export const useUpdateProfileName = (userId?: string) => useMutation({
    mutationFn: async (newDisplayName: string) => {
        if (!userId) throw new Error("UserId was undefined when trying to update profile name")
        const { error } = await supabase
            .from("profiles")
            .update({ display_name: newDisplayName })
            .eq("id", userId)

        if (error) throw new Error(error.message)
    },
    onSuccess() {
        if (userId)
            queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.user(userId) })
    },
})
