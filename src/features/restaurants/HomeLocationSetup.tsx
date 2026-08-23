import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  onSave: (lat: number, lng: number, label: string | null) => Promise<{ error: string | null } | void>
}

export function HomeLocationSetup({ onSave }: Props) {
  const [status, setStatus] = useState<"idle" | "locating" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  function useCurrentLocation() {
    setStatus("locating")
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const result = await onSave(pos.coords.latitude, pos.coords.longitude, null)
        if (result?.error) {
          setError(result.error)
          setStatus("error")
        } else {
          setStatus("idle")
        }
      },
      (err) => {
        setError(err.message)
        setStatus("error")
      }
    )
  }

  return (
    <div className="mx-auto flex max-w-md items-center justify-center p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Standort festlegen</CardTitle>
          <CardDescription>
            Wir zeigen dir Restaurants im Umkreis dieses Standorts. Du kannst ihn später ändern.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full" onClick={useCurrentLocation} disabled={status === "locating"}>
            {status === "locating" ? "Ermittle Standort…" : "Aktuellen Standort verwenden"}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
