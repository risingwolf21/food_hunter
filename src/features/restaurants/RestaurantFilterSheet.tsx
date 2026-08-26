import { useState } from "react"
import { Drawer } from "@base-ui/react/drawer"
import { Slider } from "@base-ui/react/slider"
import { Checkbox } from "@base-ui/react/checkbox"
import { Filter, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RESTAURANT_CATEGORIES } from "@/utils"

export interface RestaurantFilters {
    radiusMeters: number
    cuisines: string[] // leer = alle Küchen
}

interface Props {
    filters: RestaurantFilters
    onFiltersChanged: (filters: RestaurantFilters) => void
    onReset: () => void
}

const RADIUS_MIN = 500
const RADIUS_MAX = 5000
const RADIUS_STEP = 250

export function RestaurantFilterSheet({ filters, onFiltersChanged, onReset }: Props) {

    const [radius, setRadius] = useState(filters.radiusMeters);
    const [cuisines, setCuisines] = useState<string[]>(filters.cuisines)

    const toggleCuisine = (cuisine: string) => {
        setCuisines(cuisines.includes(cuisine)
            ? cuisines.filter((c) => c !== cuisine)
            : [...cuisines, cuisine])
    }

    const onApply = () => {
        onFiltersChanged({
            cuisines: cuisines,
            radiusMeters: radius
        })
    }

    const [search, setSearch] = useState("")
    const visibleCategories = RESTAURANT_CATEGORIES.filter((c) =>
        c.toLowerCase().includes(search.toLowerCase())
    )
    const activeCount = filters.cuisines.length

    return (
        <Drawer.Root>
            <Drawer.Trigger
                render={
                    <Button variant="secondary" size="sm" className="gap-1.5">
                        <Filter className="size-4" />
                        Filter
                        {activeCount > 0 && (
                            <span className="flex size-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                                {activeCount}
                            </span>
                        )}
                    </Button>
                }
            />

            <Drawer.Portal>
                <Drawer.Backdrop className="fixed inset-0 z-50 bg-black/40 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
                <Drawer.Viewport className="fixed inset-x-0 bottom-0 z-50">
                    <Drawer.Popup className="mx-auto flex max-h-[80vh] w-full max-w-md flex-col rounded-t-xl bg-background transition-transform data-[ending-style]:translate-y-full data-[starting-style]:translate-y-full">
                        <div className="flex items-center justify-between border-b p-4">
                            <Drawer.Title className="font-semibold">Filter</Drawer.Title>
                            <Drawer.Close render={<Button variant="ghost" size="icon" />}>
                                <X className="size-4" />
                            </Drawer.Close>
                        </div>

                        <div className="flex-1 space-y-6 overflow-y-auto p-4">
                            {/* Radius */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm font-medium">
                                    <span>Umkreis</span>
                                    <span className="text-muted-foreground">{(radius / 1000).toFixed(1)} km</span>
                                </div>
                                <Slider.Root
                                    min={RADIUS_MIN}
                                    max={RADIUS_MAX}
                                    step={RADIUS_STEP}
                                    value={radius}
                                    onValueChange={(value) => setRadius(value as number)}
                                >
                                    <Slider.Control className="flex w-full items-center py-2">
                                        <Slider.Track className="h-1.5 w-full rounded-full bg-muted">
                                            <Slider.Indicator className="h-full rounded-full bg-primary" />
                                            <Slider.Thumb className="size-4 rounded-full bg-primary shadow" />
                                        </Slider.Track>
                                    </Slider.Control>
                                </Slider.Root>
                            </div>

                            {/* Küchen */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm font-medium">
                                    <span>Küche</span>
                                    {activeCount > 0 && (
                                        <button onClick={onReset} className="text-xs font-normal text-muted-foreground hover:text-foreground">
                                            Zurücksetzen
                                        </button>
                                    )}
                                </div>
                                <Input placeholder="Küche suchen…" value={search} onChange={(e) => setSearch(e.target.value)} />
                                <div className="max-h-60 space-y-1 overflow-y-auto">
                                    {visibleCategories.map((cuisine) => {
                                        const checked = cuisines.includes(cuisine)
                                        return (
                                            <label key={cuisine} className="flex items-center gap-2.5 rounded-md px-1.5 py-1.5 text-sm hover:bg-accent">
                                                <Checkbox.Root
                                                    checked={checked}
                                                    onCheckedChange={() => toggleCuisine(cuisine)}
                                                    className="flex size-4 items-center justify-center rounded border data-[checked]:border-primary data-[checked]:bg-primary"
                                                >
                                                    <Checkbox.Indicator>
                                                        <Check className="size-3 text-primary-foreground" />
                                                    </Checkbox.Indicator>
                                                </Checkbox.Root>
                                                <span className="capitalize">{cuisine}</span>
                                            </label>
                                        )
                                    })}
                                    {visibleCategories.length === 0 && <p className="py-2 text-sm text-muted-foreground">Keine Treffer.</p>}
                                </div>
                            </div>
                        </div>

                        <div className="border-t p-4">
                            <Drawer.Close render={<Button className="w-full" onClick={onApply} />}>Anzeigen</Drawer.Close>
                        </div>
                    </Drawer.Popup>
                </Drawer.Viewport>
            </Drawer.Portal>
        </Drawer.Root>
    )
}