const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY

export interface GeocodeResult {
    formatted: string
    lat: number
    lon: number
}

interface GeocodeResponse {
    features: {
        properties: { formatted: string; lat: number; lon: number; address_line2?: string }
    }[]
}

export async function geocodeAddress(query: string): Promise<GeocodeResult[]> {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        query
    )}&limit=5&lang=de&apiKey=${API_KEY}`

    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Geocoding-Anfrage fehlgeschlagen: ${response.status}`)
    }

    const json = (await response.json()) as Partial<GeocodeResponse>
    if (!Array.isArray(json.features)) return []

    return json.features.map((f) => ({
        formatted: f.properties.address_line2 ?? f.properties.formatted,
        lat: f.properties.lat,
        lon: f.properties.lon,
    }))
}