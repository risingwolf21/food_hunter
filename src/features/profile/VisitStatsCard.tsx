import { Utensils, MapPinned, ChefHat, CalendarClock } from "lucide-react"
import { useVisitStats } from "../restaurants/useVisitStats"
import { useNavigate } from "react-router-dom"

export function VisitStatsCard() {
  const { stats, loading } = useVisitStats()

  const navigate = useNavigate()

  if (loading) return <p className="text-sm text-muted-foreground">Lädt Statistik…</p>
  if (!stats) return null

  const items = [
    { icon: Utensils, label: "Besuche", value: stats.totalVisits.toString() },
    { icon: MapPinned, label: "Verschiedene Orte", value: stats.distinctRestaurants.toString() },
    { icon: ChefHat, label: "Häufigste Küche", value: stats.topCuisine ?? "—" },
    {
      icon: CalendarClock,
      label: "Letzter Besuch",
      value: stats.lastVisitedAt ? new Date(stats.lastVisitedAt).toLocaleDateString("de-DE") : "—",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="rounded-lg border p-3" onClick={() => {
          if (label === "Besuche") {
            navigate("activity")
          }
        }}>
          <Icon className="size-4 text-muted-foreground" />
          <p className="mt-2 text-lg font-semibold">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  )
}