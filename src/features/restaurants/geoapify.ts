import { supabase } from "@/lib/supabase"

export interface GeoapifyResponse {
  type: "FeatureCollection"
  features: GeoapifyFeature[]
}

interface GeoapifyFeature {
  type: "Feature"
  properties: GeoapifyPlaceProperties
  geometry: {
    type: "Point"
    coordinates: [number, number] // [lon, lat]
  }
}

export interface GeoapifyDetailsResponse {
  type: "FeatureCollection"
  features: GeoapifyDetailsFeature[]
}

interface GeoapifyDetailsFeature {
  type: "Feature"
  properties: GeoapifyDetailsProperties
  geometry: { type: "Point"; coordinates: [number, number] }
}

interface GeoapifyDetailsProperties {
  feature_type: "details"
  place_id: string
  name?: string
  formatted: string
  address_line2?: string
  lat: number
  lon: number
  categories: string[]
  website?: string
  opening_hours?: string
  operator?: string
  contact?: { phone?: string; email?: string }
  facilities?: {
    wheelchair?: boolean
    wheelchair_details?: { condition?: string; description?: string }
    internet_access?: boolean
    outdoor_seating?: boolean
    takeaway?: boolean
    delivery?: boolean
  }
  payment_options?: Record<string, boolean>
  catering?: {
    cuisine?: string
    diet?: { vegan?: boolean; vegetarian?: boolean; halal?: boolean; kosher?: boolean }
  }
  timezone?: { name: string }
}

export interface PlaceDetail {
  restaurantId: string | null
  placeId: string
  name: string
  address: string
  lat: number
  lng: number
  cuisine: string | null
  operator: string | null
  website: string | null
  phone: string | null
  opening_hours_orig: string | null
  opening_hours: OpeningHourRule[]
  wheelchair: { accessible: boolean; limited: boolean; description: string | null } | null
  amenities: { label: string; active: boolean }[]
  diet: string[] // z.B. ["vegan", "vegetarisch"]
  paymentOptions: string[] // nur die true-Einträge, lesbar formatiert
  timezone: string | null

  visited: boolean
}

interface GeoapifyPlaceProperties {
  place_id: string
  name?: string
  formatted: string
  address_line1?: string
  address_line2?: string
  lon: number
  lat: number
  distance?: number // Meter, nur vorhanden wenn die Anfrage mit bias=proximity gestellt wurde
  categories: string[]
  website?: string
  contact?: {
    phone?: string
    email?: string
  }
  opening_hours?: string
  catering?: {
    cuisine?: string // z.B. "pizza;georgian" - mehrere durch Semikolon getrennt
  }
  facilities?: {
    wheelchair?: boolean
  }
}

// Normalisierte Form, die wir in der App verwenden - unabhängig vom API-Rohformat.
export interface Restaurant {
  placeId: string
  name: string
  lat: number
  lng: number
  address: string | null
  cuisine: string | null
  distanceMeters: number | null
  website: string | null
  phone: string | null
  wheelchairAccessible: boolean | null
  visited: boolean
}

export interface OpeningHourRule {
  days: string
  times: string
}

export function parseOsmOpeningHours(rawHours?: string | null): OpeningHourRule[] {
  if (!rawHours) return []

  // Spezialfall: 24/7 durchgehend geöffnet
  if (rawHours.trim() === '24/7') {
    return [{ days: 'Mo-Su', times: '00:00-24:00' }]
  }

  return rawHours
    .split(';')
    .map((rule) => rule.trim())
    .filter(Boolean)
    .map((rule) => {
      // Treffer für Zeiten im Format HH:MM (z. B. "11:30-14:30" oder "11:30-14:30, 18:00-22:00")
      const timeMatch = rule.match(/^(.+?)\s+(\d{1,2}:\d{2}.*)$/i)
      if (timeMatch) {
        return {
          days: timeMatch[1].trim(),
          times: timeMatch[2].trim(),
        }
      }

      // Treffer für Ruhetage (z. B. "Su off" oder "Mo-Tu closed")
      const offMatch = rule.match(/^(.+?)\s+(off|closed)$/i)
      if (offMatch) {
        return {
          days: offMatch[1].trim(),
          times: 'Geschlossen',
        }
      }

      // Fallback für unkonventionelle Formate
      return {
        days: rule,
        times: '',
      }
    })
}

const PAYMENT_LABELS: Record<string, string> = {
  cash: "Bar",
  debit_cards: "EC-Karte",
  credit_cards: "Kreditkarte",
  visa: "Visa",
  mastercard: "Mastercard",
  american_express: "American Express",
}

const DIET_LABELS: Record<string, string> = {
  vegan: "Vegan",
  vegetarian: "Vegetarisch",
  halal: "Halal",
  kosher: "Koscher",
}

export const parseRestaurant = (p: GeoapifyPlaceProperties, visited: boolean): Restaurant | null => {
  if (!p.name) return null

  return {
    placeId: p.place_id,
    name: p.name,
    lat: p.lat,
    lng: p.lon,
    address: p.address_line2 ?? p.formatted ?? null,
    cuisine: deriveCuisineLabel(p),
    distanceMeters: p.distance ?? null,
    website: p.website ?? null,
    phone: p.contact?.phone ?? null,
    wheelchairAccessible: p.facilities?.wheelchair ?? null,
    visited: visited
  }
}

export function parseGeoapifyResponse(json: unknown, visits: { restaurants: { place_id: string } }[]): Restaurant[] {
  const data = json as Partial<GeoapifyResponse>
  if (!Array.isArray(data?.features)) return []

  const parsed: (Restaurant | null)[] = data.features.map((feature) => {
    const p = feature.properties
    const visited = visits.find(x => x.restaurants.place_id === p.place_id);
    return parseRestaurant(p, visited !== undefined)
  })

  return parsed.filter((r): r is Restaurant => r !== null)
}

function deriveCuisineLabel(properties: GeoapifyPlaceProperties): string | null {
  if (properties.catering?.cuisine) {
    return properties.catering.cuisine.split(";")[0]
  }
  const categories = properties.categories ?? []
  const specific = categories.find((c) => c.startsWith("catering.") && c.split(".").length === 3)
  if (specific) return specific.split(".")[2]
  const general = categories.find((c) => c.startsWith("catering.") && c.split(".").length === 2)
  return general ? general.split(".")[1] : null
}

const GEOPAIFY_PLACES_URL = "https://api.geoapify.com/v2/places"
const GEOPAIFY_PLACE_DETAILS_URL = "https://api.geoapify.com/v2/place-details"
const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY

/**
 * Lädt Restaurants (amenity=restaurant) im Umkreis von [lat, lng] via Overpass API.
 * radiusMeters: Suchradius, z.B. 1500 für 1.5km.
 */
export async function fetchNearbyRestaurants(
  lat: number,
  lng: number,
  radiusMeters: number,
  userId: string
): Promise<Restaurant[]> {

  // ?categories=catering&filter=circle:11.5754895,48.1374742,5000&bias=proximity:11.5754895,48.1374742&lang=de&limit=20&apiKey=YOUR_API_KEY

  const url = `${GEOPAIFY_PLACES_URL}?categories=catering&filter=circle:${lng},${lat},${radiusMeters}&bias=proximity:${lng},${lat}&limit=100&apiKey=${API_KEY}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })

  if (!response.ok) {
    throw new Error(`Overpass-Anfrage fehlgeschlagen: ${response.status}`)
  }

  const { data } = await supabase.from("visits").select("*, restaurants(place_id)").eq("user_id", userId)

  const json = await response.json()
  return parseGeoapifyResponse(json, data ?? [])
}


export function parseGeoapifyPlaceDetails(json: unknown, visited: { restaurants: { place_id: string, id: string } } | null): PlaceDetail | null {
  const data = json as Partial<GeoapifyDetailsResponse>
  const feature = data?.features?.[0]
  const p = feature?.properties

  if (!p?.name) return null


  const wheelchair =
    p?.facilities?.wheelchair === undefined
      ? null
      : {
        accessible: p.facilities?.wheelchair,
        limited: p.facilities?.wheelchair_details?.condition === "limited",
        description: p.facilities?.wheelchair_details?.description ?? null,
      }

  const amenities = [
    { label: "WLAN", active: p.facilities?.internet_access === true },
    { label: "Außenbereich", active: p.facilities?.outdoor_seating === true },
    { label: "Zum Mitnehmen", active: p.facilities?.takeaway === true },
    { label: "Lieferung", active: p.facilities?.delivery === true },
  ].filter((a) => a.active)

  const diet = Object.entries(p.catering?.diet ?? {})
    .filter(([, value]) => value === true)
    .map(([key]) => DIET_LABELS[key] ?? key)

  const paymentOptions = Object.entries(p.payment_options ?? {})
    .filter(([, value]) => value === true)
    .map(([key]) => PAYMENT_LABELS[key] ?? key)


  return {
    restaurantId: visited?.restaurants?.id ?? null,
    placeId: p.place_id,
    name: p.name,
    address: p.address_line2 ?? p.formatted,
    lat: p.lat,
    lng: p.lon,
    cuisine: p.catering?.cuisine?.split(";")[0] ?? null,
    operator: p.operator ?? null,
    website: p.website ?? null,
    phone: p.contact?.phone ?? null,
    opening_hours: parseOsmOpeningHours(p.opening_hours),
    opening_hours_orig: p.opening_hours ?? null,
    wheelchair,
    amenities,
    diet,
    paymentOptions,
    timezone: p.timezone?.name ?? null,
    visited: visited !== null
  }
}


/**
 * Lädt Restaurants (amenity=restaurant) im Umkreis von [lat, lng] via Overpass API.
 * radiusMeters: Suchradius, z.B. 1500 für 1.5km.
 */
export async function fetchRestaurant(
  placeId: string,
  userId: string
): Promise<PlaceDetail | null> {
  const url = `${GEOPAIFY_PLACE_DETAILS_URL}?id=${placeId}&features=details&apiKey=${API_KEY}`

  const fetchGeoapify = fetch(url, {
    method: "GET",
    headers: { "Access-Control-Allow-Origin": "*" },
  })

  const fetchVisits = supabase
    .from("visits")
    .select("id, restaurant_id, restaurants!inner(place_id, id)")
    .eq("user_id", userId)
    .eq("restaurants.place_id", placeId)
    .maybeSingle()

  const [response, visitsResponse] = await Promise.all([fetchGeoapify, fetchVisits])

  if (!response.ok) {
    throw new Error(`Geoapify-Anfrage fehlgeschlagen: ${response.status}`)
  }
  if (visitsResponse.error) {
    throw new Error(visitsResponse.error.message)
  }

  const json = await response.json()
  return parseGeoapifyPlaceDetails(json, visitsResponse.data)
}

/** Haversine-Distanz in Metern zwischen zwei Koordinaten. */
export function distanceMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export async function upsertRestaurantAndCreateVisit(userId: string, place: PlaceDetail) {

  if (place.visited && place.restaurantId) {
    const { error: visitError } = await supabase
      .from("visits")
      .delete()
      .eq("restaurant_id", place.restaurantId)
      .eq("user_id", userId)

    if (visitError) {
      throw new Error(visitError.message ?? "Besuch konnte nicht gelöscht werden")
    }

    return { restaurantId: place.restaurantId, visitId: null, place }
  }

  const { data: restaurant, error: upsertError } = await supabase
    .from("restaurants")
    .upsert(
      {
        place_id: place.placeId,
        name: place.name,
        lat: place.lat,
        lng: place.lng,
        address: place.address,
        cuisine: place.cuisine,
        phone: place.phone,
        website: place.website,
        opening_hours: place.opening_hours_orig,
        wheelchair_accessible: place.wheelchair?.accessible ?? null,
        wheelchair_limited: place.wheelchair?.limited ?? null,
        wheelchair_description: place.wheelchair?.description ?? null,
        internet_access: place.amenities.some((a) => a.label === "WLAN"),
        outdoor_seating: place.amenities.some((a) => a.label === "Außenbereich"),
        takeaway: place.amenities.some((a) => a.label === "Zum Mitnehmen"),
        delivery: place.amenities.some((a) => a.label === "Lieferung"),
        diet_vegan: place.diet.includes("Vegan"),
        diet_vegetarian: place.diet.includes("Vegetarisch"),
        diet_halal: place.diet.includes("Halal"),
        diet_kosher: place.diet.includes("Koscher"),
        payment_options: place.paymentOptions.length ? place.paymentOptions : null,
        last_synced_at: new Date().toISOString(),
      },
      { onConflict: "place_id" }
    )
    .select("id")
    .single()

  if (upsertError || !restaurant) {
    throw new Error(upsertError?.message ?? "Restaurant konnte nicht gespeichert werden")
  }

  const { data: visit, error: visitError } = await supabase
    .from("visits")
    .insert({ user_id: userId, restaurant_id: restaurant.id })
    .select("id")
    .single()

  if (visitError || !visit) {
    throw new Error(visitError?.message ?? "Besuch konnte nicht gespeichert werden")
  }

  return { restaurantId: restaurant.id, visitId: visit.id, place }

}