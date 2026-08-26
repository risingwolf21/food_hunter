import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { useApplication } from "@/contexts/application-context"
import { useAuth } from "@/contexts/auth-context"
import { HomeAddressEditor } from "@/features/profile/HomeAddressEditor"
import { VisitStatsCard } from "@/features/profile/VisitStatsCard"
import { useProfile, useUpdateProfileName } from "@/tanstack/profile"
import { useState } from "react"

export const ProfilePage = () => {
    const { signOut } = useApplication()
    const { session } = useAuth()

    const { data: profile, isLoading } = useProfile();

    const updateUserName = useUpdateProfileName(session?.user.id);

    const [username, setUsername] = useState(profile?.display_name ?? "")

    return (
        <div className="mx-auto max-w-md h-full min-h-0 flex-col flex w-full space-y-4 p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Profil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{session?.user.email}</p>
                    <Field orientation="horizontal">
                        <Input
                            type="search"
                            placeholder="Suche eine Person..."
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Button onClick={() => updateUserName.mutate(username)} disabled={username === profile?.display_name || isLoading}>
                            {
                                isLoading ? <Spinner /> : "Speichern"
                            }
                        </Button>
                    </Field>
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