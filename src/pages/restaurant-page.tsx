import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useAddComment, useComments, useDeleteComment } from "@/features/restaurants/comments";
import type { PlaceDetail } from "@/features/restaurants/geoapify";
import { useMyRating, useRatingSummary, useUpsertRating } from "@/features/restaurants/reviews";
import { useMarkVisited } from "@/tanstack/restaurants";
import {
    Accessibility,
    ArrowLeft,
    Clock,
    CreditCard,
    Globe,
    HousePlug,
    MapPin,
    MessageSquare,
    Phone,
    Star,
    Trash2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export const RestaurantPage = ({ restaurant, isLoading, error }: { restaurant: PlaceDetail, isLoading: boolean, error: Error | null }) => {

    const { user } = useAuth();

    const navigate = useNavigate();

    const markVisited = useMarkVisited(user.id)

    const { data: ratingSummary } = useRatingSummary(restaurant.restaurantId)
    const { data: myRating } = useMyRating(user.id, restaurant.restaurantId)
    const upsertRating = useUpsertRating(user.id, restaurant.restaurantId)

    const { data: comments } = useComments(restaurant.restaurantId)
    const addComment = useAddComment(restaurant.restaurantId)
    const deleteComment = useDeleteComment(restaurant.restaurantId)
    const [commentText, setCommentText] = useState("")

    function handleAddComment() {
        const body = commentText.trim()
        if (!body || !user) return
        addComment.mutate({ userId: user.id, body })
        setCommentText("")
    }

    return (
        <div className="dvh-full">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center gap-2 border-b bg-background p-3">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft />
                </Button>
                <p className="truncate font-medium">{restaurant?.name ?? "Restaurant"}</p>
            </div>

            <div className="space-y-4 p-4">
                {isLoading && <p className="text-sm text-muted-foreground">Lädt…</p>}
                {error && <p className="text-sm text-destructive">{error.message}</p>}

                {restaurant && (
                    <>
                        {/* Titelblock */}
                        <div className="flex justify-between">
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-xl font-semibold">{restaurant.name}</h1>
                                    {restaurant.cuisine && <Badge variant="secondary">{restaurant.cuisine}</Badge>}
                                </div>
                                <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
                                    <MapPin className="mt-0.5 size-4 shrink-0" />
                                    {restaurant.address}
                                </p>
                                {ratingSummary && ratingSummary.ratingCount > 0 && (
                                    <p className="flex items-center gap-1 text-sm">
                                        <Star className="size-4 fill-primary text-primary" />
                                        <span className="font-medium">{ratingSummary.avgRating}</span>
                                        <span className="text-muted-foreground">
                                            ({ratingSummary.ratingCount} {ratingSummary.ratingCount === 1 ? "Bewertung" : "Bewertungen"})
                                        </span>
                                    </p>
                                )}
                            </div>

                            <Button variant={"outline"} onClick={() => markVisited.mutate(restaurant)}>
                                {
                                    restaurant.visited ? <Star color="gold" fill="gold" /> : <Star />
                                }
                            </Button>
                        </div>

                        {/* Diät-Badges */}
                        {restaurant.diet.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {restaurant.diet.map((d) => (
                                    <Badge key={d} variant="outline">
                                        {d}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Kontakt-Aktionen */}
                        <Card className="py-0">
                            <CardContent className="divide-y p-0">
                                {restaurant.phone && (
                                    <a
                                        href={`tel:${restaurant.phone}`}
                                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent"
                                    >
                                        <Phone className="size-4 text-muted-foreground" />
                                        {restaurant.phone}
                                    </a>
                                )}
                                {restaurant.website && (
                                    <a
                                        href={restaurant.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent"
                                    >
                                        <Globe className="size-4 text-muted-foreground" />
                                        <span className="truncate">Website</span>
                                    </a>
                                )}
                                {restaurant.wheelchair && (
                                    <div className="flex items-start gap-3 px-4 py-3 text-sm">
                                        <Accessibility className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                        <div>
                                            <p>
                                                {!restaurant.wheelchair.accessible
                                                    ? "Nicht rollstuhlgerecht"
                                                    : restaurant.wheelchair.limited
                                                        ? "Eingeschränkt rollstuhlgerecht"
                                                        : "Rollstuhlgerecht"}
                                            </p>
                                            {restaurant.wheelchair.description && (
                                                <p className="text-xs text-muted-foreground">
                                                    {restaurant.wheelchair.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {
                            restaurant.amenities.length > 0 && <Card className="py-0">
                                <CardContent className="divide-y p-0">
                                    {restaurant.wheelchair && (
                                        <div className="flex items-start gap-3 px-4 py-3 text-sm">
                                            <HousePlug className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                            <div>
                                                <p>
                                                    Ausstattungen
                                                </p>
                                                <div className="mt-1 flex flex-wrap gap-2">
                                                    {restaurant.amenities.map((a) => (
                                                        <Badge key={a.label} variant="outline">
                                                            {a.label}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        }

                        {
                            restaurant.opening_hours && <Card className="py-0">
                                <CardContent className="divide-y p-0">
                                    <div className="flex items-start gap-3 px-4 py-3 text-sm">
                                        <Clock className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                        <div>
                                            <p>
                                                Öffnungszeiten
                                            </p>
                                            <div className="grid grid-cols-2 gap-2 mt-1">
                                                {
                                                    ...restaurant.opening_hours.map(x => [
                                                        <div key={x.days} className="font-bold">{x.days}</div>,
                                                        <div key={x.days + "times"}>{x.times}</div>
                                                    ])
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        }

                        {
                            restaurant.paymentOptions.length > 0 && <Card className="py-0">
                                <CardContent className="divide-y p-0">
                                    <div className="flex items-start gap-3 px-4 py-3 text-sm">
                                        <CreditCard className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                                        <div>
                                            <p>
                                                Zahlungsmethoden
                                            </p>
                                            <div className="mt-1 flex flex-wrap gap-2">
                                                {restaurant.paymentOptions.map((p) => (
                                                    <Badge key={p} variant="outline">
                                                        {p}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        }

                        <Card className="py-0">
                            <CardContent className="space-y-2 px-4 py-3">
                                <p className="text-sm font-medium">Deine Bewertung</p>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <button
                                            key={n}
                                            type="button"
                                            onClick={() => upsertRating.mutate(n)}
                                            disabled={upsertRating.isPending}
                                        >
                                            <Star
                                                className={
                                                    myRating !== null && myRating !== undefined && n <= myRating
                                                        ? "size-6 fill-primary text-primary"
                                                        : "size-6 text-muted-foreground"
                                                }
                                            />
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="py-0">
                            <CardContent className="space-y-3 px-4 py-3">
                                <p className="flex items-center gap-1.5 text-sm font-medium">
                                    <MessageSquare className="size-4 text-muted-foreground" />
                                    Kommentare
                                </p>

                                <div className="flex gap-2">
                                    <input
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Kommentar schreiben…"
                                        className="flex-1 rounded-md border px-3 py-1.5 text-sm"
                                    />
                                    <Button size="sm" onClick={handleAddComment} disabled={addComment.isPending}>
                                        Senden
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    {comments?.length === 0 && (
                                        <p className="text-sm text-muted-foreground">Noch keine Kommentare.</p>
                                    )}
                                    {comments?.map((c) => (
                                        <div key={c.id} className="flex items-start justify-between gap-2 border-t pt-2 text-sm">
                                            <div>
                                                <p className="font-medium">{c.username ?? "Jemand"}</p>
                                                <p className="text-muted-foreground">{c.body}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(c.createdAt).toLocaleDateString("de-DE")}
                                                </p>
                                            </div>
                                            {c.userId === user.id && (
                                                <button onClick={() => deleteComment.mutate(c.id)}>
                                                    <Trash2 className="size-4 text-muted-foreground hover:text-destructive" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </div >
    )
}