import { cn } from "@/lib/utils"

interface PageLayoutProps {
    appBar: React.ReactNode
    children: React.ReactNode
    /** false für Seiten, die ihr Scrollen selbst steuern (z.B. eine Leaflet-Karte) */
    scroll?: boolean
}

export function PageLayout({ appBar, children, scroll = true }: PageLayoutProps) {
    return (
        <div className="flex h-full min-h-0 flex-col">
            {appBar}
            <div className={cn("min-h-0 flex-1", scroll && "overflow-y-auto")}>{children}</div>
        </div>
    )
}