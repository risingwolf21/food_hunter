import { Outlet } from "react-router-dom"
import { BottomNav } from "./bottom-navigation"

export const AppShell = () => {
    return (
        <div className='flex min-h-dvh w-full'>
            <div className='flex flex-1 flex-col size-full'>
                <Outlet />
            </div>
            <BottomNav />
        </div>
    )
}