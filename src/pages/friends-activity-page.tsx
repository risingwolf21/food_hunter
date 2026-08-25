import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { CheckCircle2, MapPin, MessageSquare, Star } from "lucide-react"
import { useFriendActivityFeed } from "@/features/activities/friendActivities"

export function FriendFeedPage() {
    const { data: activities, isLoading, error } = useFriendActivityFeed()
    const navigate = useNavigate()

    return (
        <div className="mx-auto max-w-md space-y-3 p-4">
            <h1 className="text-lg font-semibold">Freunde-Feed</h1>

            {isLoading && <p className="text-sm text-muted-foreground">Lädt…</p>}
            {error && <p className="text-sm text-destructive">{error.message}</p>}
            {activities?.length === 0 && (
                <p className="text-sm text-muted-foreground">Noch keine Aktivität von Freunden.</p>
            )}

            <div className="space-y-2">
                {activities?.map((activity) => (
                    <Card
                        key={`${activity.type}-${activity.id}`}
                        className="cursor-pointer py-0"
                        onClick={() => navigate(`/restaurant/${activity.restaurantId}`)}
                    >
                        <CardContent className="space-y-1.5 px-4 py-3 text-sm">
                            <p className="flex items-center gap-1.5">
                                {activity.type === "visited" && <CheckCircle2 className="size-4 shrink-0 text-muted-foreground" />}
                                {activity.type === "rated" && <Star className="size-4 shrink-0 fill-primary text-primary" />}
                                {activity.type === "commented" && <MessageSquare className="size-4 shrink-0 text-muted-foreground" />}
                                <span>
                                    <span className="font-medium">{activity.friendUsername ?? "Jemand"}</span>{" "}
                                    {activity.type === "visited" && "war hier"}
                                    {activity.type === "rated" && `hat ${activity.rating}★ vergeben`}
                                    {activity.type === "commented" && "hat kommentiert"}
                                </span>
                            </p>

                            <p className="flex items-center gap-1.5 text-muted-foreground">
                                <MapPin className="size-3.5 shrink-0" />
                                {activity.restaurantName}
                                {activity.cuisine && (
                                    <Badge variant="secondary" className="ml-1">
                                        {activity.cuisine}
                                    </Badge>
                                )}
                            </p>

                            {activity.type === "commented" && (
                                <p className="truncate text-muted-foreground">„{activity.commentBody}"</p>
                            )}

                            <p className="text-xs text-muted-foreground">
                                {new Date(activity.occurredAt).toLocaleDateString("de-DE")}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}