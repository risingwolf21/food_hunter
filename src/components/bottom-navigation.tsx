import { NavLink } from "react-router-dom"
import { Toolbar } from "@base-ui/react/toolbar"
import { Map, List, User } from "lucide-react"
import { cn } from "@/lib/utils"

const TABS = [
    {
        to: "map",
        label: "Karte",
        icon: Map
    },
    { 
        to: "list", 
        label: "Liste", 
        icon: List 
    },
    { 
        to: "profile", 
        label: "Profil", 
        icon: User 
    },
]

export const BottomNav = () => {

    return (
        <Toolbar.Root
            render={<nav aria-label="Hauptnavigation" />}
            className="fixed inset-x-0 bottom-0 z-50 border-t bg-background"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
            <div className="mx-auto flex w-full max-w-md">
                {TABS.map(({ to, label, icon: Icon }) => (
                    <Toolbar.Link
                        key={to}
                        className="flex-1"
                        render={
                            <NavLink to={to}>
                                {({ isActive }) => (
                                    <span
                                        className={cn(
                                            "flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors",
                                            isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <Icon className="size-5" />
                                        {label}
                                    </span>
                                )}
                            </NavLink>
                        }
                    />
                ))}
            </div>
        </Toolbar.Root>
    )
}