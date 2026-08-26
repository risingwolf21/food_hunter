import { NavLink } from "react-router-dom"
import { Toolbar } from "@base-ui/react/toolbar"
import { Map, User, Users, Newspaper } from "lucide-react"
import { cn } from "@/lib/utils"

const TABS = [
    {
        to: "map",
        label: "Karte",
        icon: Map
    },
    { 
        to: "feed", 
        label: "Feed", 
        icon: Newspaper 
    },
    { 
        to: "friends", 
        label: "Freunde", 
        icon: Users 
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
            className="border-t bg-background"
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