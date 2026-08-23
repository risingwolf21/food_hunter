import opening_hours from "opening_hours"

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
  placeId: string
  name: string
  address: string
  lat: number
  lng: number
  cuisine: string | null
  operator: string | null
  website: string | null
  phone: string | null
  opening_hours: Map<string, string>
  wheelchair: { accessible: boolean; limited: boolean; description: string | null } | null
  amenities: { label: string; active: boolean }[]
  diet: string[] // z.B. ["vegan", "vegetarisch"]
  paymentOptions: string[] // nur die true-Einträge, lesbar formatiert
  timezone: string | null
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

export const parseRestaurant = (p: GeoapifyPlaceProperties): Restaurant | null => {
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
    wheelchairAccessible: p.facilities?.wheelchair ?? null
  }
}

export function parseGeoapifyResponse(json: unknown): Restaurant[] {
  const data = json as Partial<GeoapifyResponse>
  if (!Array.isArray(data?.features)) return []

  const parsed: (Restaurant | null)[] = data.features.map((feature) => {
    const p = feature.properties
    return parseRestaurant(p)
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
  radiusMeters: number
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

  const json = await response.json()
  return parseGeoapifyResponse(json)
}

export function parseGeoapifyPlaceDetails(json: unknown): PlaceDetail | null {
  const data = json as Partial<GeoapifyDetailsResponse>
  const feature = data?.features?.[0]
  const p = feature?.properties

  if (!p?.name) return null

  const oh = new opening_hours(p.opening_hours ?? "")

  const startOfWeek = new Date();
  const currentDay = startOfWeek.getDay(); // 0 is Sunday, 1 is Monday
  const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  startOfWeek.setDate(startOfWeek.getDate() + distanceToMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const ohResult = new Map<string, string>()

  // Iterate through all 7 days of the week
  days.forEach((dayName, index) => {
    const dateFrom = new Date(startOfWeek);
    dateFrom.setDate(startOfWeek.getDate() + index);

    const dateTo = new Date(dateFrom);
    dateTo.setDate(dateFrom.getDate() + 1); // Up to the start of the next day

    // Get all periods when the restaurant is open on this specific day
    const intervals = oh.getOpenIntervals(dateFrom, dateTo);

    const timeStrings = intervals.map(interval => {
      const start = interval[0].toLocaleTimeString(["de"], { hour: '2-digit', minute: '2-digit', hour12: false });
      const end = interval[1].toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      return `${start} - ${end}`;
    });

    const displayHours = timeStrings.length > 0 ? timeStrings.join(', ') : 'Closed';
    ohResult.set(dayName, displayHours)
  });

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
    placeId: p.place_id,
    name: p.name,
    address: p.address_line2 ?? p.formatted,
    lat: p.lat,
    lng: p.lon,
    cuisine: p.catering?.cuisine?.split(";")[0] ?? null,
    operator: p.operator ?? null,
    website: p.website ?? null,
    phone: p.contact?.phone ?? null,
    opening_hours: ohResult,
    wheelchair,
    amenities,
    diet,
    paymentOptions,
    timezone: p.timezone?.name ?? null,
  }
}


/**
 * Lädt Restaurants (amenity=restaurant) im Umkreis von [lat, lng] via Overpass API.
 * radiusMeters: Suchradius, z.B. 1500 für 1.5km.
 */
export async function fetchRestaurant(
  placeId: string
): Promise<PlaceDetail | null> {

  const url = `${GEOPAIFY_PLACE_DETAILS_URL}?id=${placeId}&features=details&apiKey=${API_KEY}`

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })

  if (!response.ok) {
    throw new Error(`Overpass-Anfrage fehlgeschlagen: ${response.status}`)
  }

  const json = await response.json()
  return parseGeoapifyPlaceDetails(json)
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