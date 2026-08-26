import { AppBar } from "@/components/ui/appbar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { cn } from "@/lib/utils"
import { useProfileVisits } from "@/tanstack/visits"
import { ChefHat, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const ProfileActivityPage = () => {
    const { profile } = useAuth();
    const { data: visits = [] } = useProfileVisits(profile.id)
    const navigate = useNavigate()

    return <div className="flex flex-col h-screen">
        <AppBar
            className='!border-b !shadow-sm'
            title="Besuche"
            user={profile!}
        />
        <main className='flex-1 size-full pb-safe-bottom '>
            <div className="p-2">
                {visits
                    .sort((a, b) => a.visited_at > b.visited_at ? -1 : 1)
                    .map((v) => (
                        <Card

                            key={v.restaurant_id}
                            onClick={() => navigate(`/restaurant/${v.restaurants.place_id}`)}
                        >
                            <CardContent className="flex items-center gap-3 px-4">
                                <ChefHat className={cn("size-5 shrink-0")} />
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="truncate font-medium">{v.restaurants.name}</p>
                                        {v.restaurants.cuisine && (
                                            <Badge variant="secondary" className="shrink-0 capitalize">
                                                {v.restaurants.cuisine}
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <MapPin className="size-3 shrink-0" />
                                        {v.restaurants.address ? ` · ${v.restaurants.address}` : ""}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </main>
    </div>
}