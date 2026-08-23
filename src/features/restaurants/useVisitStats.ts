import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react"

export interface VisitStats {
    totalVisits: number
    distinctRestaurants: number
    topCuisine: string | null
    lastVisitedAt: string | null
}

interface VisitRow {
    restaurant_id: string
    visited_at: string
    restaurants: { cuisine: string | null } | null
}

export function useVisitStats() {
    const { session } = useAuth()
    const [stats, setStats] = useState<VisitStats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!session) {
            setLoading(false)
            return
        }
        let cancelled = false
        setLoading(true)

        supabase
            .from("visits")
            .select("restaurant_id, visited_at, restaurants(cuisine)")
            .eq("user_id", session.user.id)
            .then(({ data }) => {
                if (cancelled) return
                const rows = (data ?? []) as unknown as VisitRow[]

                if (rows.length === 0) {
                    setStats({ totalVisits: 0, distinctRestaurants: 0, topCuisine: null, lastVisitedAt: null })
                    setLoading(false)
                    return
                }

                const cuisineCounts = new Map<string, number>()
                let lastVisitedAt = rows[0].visited_at

                for (const row of rows) {
                    const cuisine = row.restaurants?.cuisine
                    if (cuisine) cuisineCounts.set(cuisine, (cuisineCounts.get(cuisine) ?? 0) + 1)
                    if (row.visited_at > lastVisitedAt) lastVisitedAt = row.visited_at
                }

                let topCuisine: string | null = null
                let topCount = 0
                for (const [cuisine, count] of cuisineCounts) {
                    if (count > topCount) {
                        topCuisine = cuisine
                        topCount = count
                    }
                }

                setStats({
                    totalVisits: rows.length,
                    distinctRestaurants: new Set(rows.map((r) => r.restaurant_id)).size,
                    topCuisine,
                    lastVisitedAt,
                })
                setLoading(false)
            })

        return () => {
            cancelled = true
        }
    }, [session])

    return { stats, loading }
}