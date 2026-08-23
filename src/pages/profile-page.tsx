import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/auth-context"
import { HomeAddressEditor } from "@/features/restaurants/HomeAddressEditor"
import { VisitStatsCard } from "@/features/restaurants/VisitStatsCard"

export const ProfilePage = () => {
    const { session, signOut } = useAuth()

    return (
        <div className="mx-auto max-w-md space-y-4 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Profil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{session?.user.email}</p>
                    <Button variant="outline" onClick={signOut}>
                        Abmelden
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Standort</CardTitle>
                </CardHeader>
                <CardContent>
                    <HomeAddressEditor />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Statistik</CardTitle>
                </CardHeader>
                <CardContent>
                    <VisitStatsCard />
                </CardContent>
            </Card>
        </div>
    )
}