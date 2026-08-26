import { Outlet } from "react-router-dom"
import { BottomNav } from "./bottom-navigation"

export const AppShell = () => {
    return (
        <div className="flex h-dvh w-full flex-col overflow-hidden">
            <div className="min-h-0 flex-1">
                <Outlet />
            </div>
            <BottomNav />
        </div>
    )
}