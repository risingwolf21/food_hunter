import { useCallback, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/auth-context"

export interface HomeLocation {
  lat: number
  lng: number
  label: string | null
}

export function useHomeLocation() {
  const { session } = useAuth()
  const [home, setHome] = useState<HomeLocation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      setLoading(false)
      return
    }
    let cancelled = false

    supabase
      .from("profiles")
      .select("home_lat, home_lng, home_label")
      .eq("id", session.user.id)
      .single()
      .then(({ data }) => {
        if (cancelled) return
        if (data?.home_lat && data?.home_lng) {
          setHome({ lat: data.home_lat, lng: data.home_lng, label: data.home_label })
        }
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [session])

  const saveHome = useCallback(
    async (lat: number, lng: number, label: string | null) => {
      if (!session) return
      const { error } = await supabase
        .from("profiles")
        .update({ home_lat: lat, home_lng: lng, home_label: label })
        .eq("id", session.user.id)

      if (!error) setHome({ lat, lng, label })
      return { error: error?.message ?? null }
    },
    [session]
  )

  return { home, loading, saveHome }
}
