import { useState } from "react"
import { Search, MapPin, Check, TriangleAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useHomeLocation } from "../restaurants/useHomeLocation"
import { geocodeAddress, type GeocodeResult } from "../restaurants/geocode"
import { Alert, AlertTitle } from "@/components/ui/alert"

export function HomeAddressEditor() {
    const { home, saveHome } = useHomeLocation()
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<GeocodeResult[]>([])
    const [searching, setSearching] = useState(false)
    const [saving, setSaving] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        if (!query.trim()) return
        setSearching(true)
        setError(null)
        setResults([])

        try {
            const found = await geocodeAddress(query)
            if (found.length === 0) setError("Keine Adresse gefunden. Versuch's genauer (Straße + Stadt).")
            setResults(found)
        } catch (e) {
            setError(e instanceof Error ? e.message : "Unbekannter Fehler bei der Adresssuche")
        } finally {
            setSearching(false)
        }
    }

    async function handleSelect(result: GeocodeResult) {
        setSaving(result.formatted)
        const res = await saveHome(result.lat, result.lon, result.formatted)
        if (res?.error) setError(res.error)
        else {
            setResults([])
            setQuery("")
        }
        setSaving(null)
    }

    return (
        <div className="space-y-3">
            {home && (
                <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 size-4 shrink-0" />
                    {home.label ?? `${home.lat.toFixed(5)}, ${home.lng.toFixed(5)}`}
                </p>
            )}

            {!home && (
                <Alert variant={"error"}>
                    <TriangleAlert />
                    <AlertTitle>Du musst deine Adresse setzen um Restaurants und Cafés in deiner Nähe entdecken zu können.</AlertTitle>
                </Alert>
            )}

            <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                    placeholder="Straße, Hausnummer, Stadt…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" size="icon" disabled={searching}>
                    <Search />
                </Button>
            </form>

            {error && <p className="text-sm text-destructive">{error}</p>}

            {results.length > 0 && (
                <Card>
                    <CardContent className="divide-y p-0">
                        {results.map((r) => (
                            <button
                                key={`${r.lat},${r.lon}`}
                                onClick={() => handleSelect(r)}
                                disabled={saving !== null}
                                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm hover:bg-accent disabled:opacity-50"
                            >
                                <span className="flex items-center gap-2">
                                    <MapPin className="size-4 shrink-0 text-muted-foreground" />
                                    {r.formatted}
                                </span>
                                {saving === r.formatted && <Check className="size-4 shrink-0 animate-pulse" />}
                            </button>
                        ))}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}