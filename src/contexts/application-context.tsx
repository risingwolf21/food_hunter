import queryClient from '@/lib/queryclient'
import { supabase } from '@/lib/supabase'
import type { AuthError } from '@supabase/supabase-js'
import * as React from 'react'

interface ApplicationContextValue {
    signIn: (email: string, password: string) => Promise<AuthError | null>
    signUp: (email: string, password: string, fullName: string) => Promise<AuthError | null>
    signOut: () => Promise<void>
}

const ApplicationContext = React.createContext<ApplicationContextValue | null>(null)

export function ApplicationProvider({ children }: { children: React.ReactNode }) {

    async function signIn(email: string, password: string): Promise<AuthError | null> {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return error
    }

    async function signUp(email: string, password: string, fullName: string): Promise<AuthError | null> {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName } },
        })
        return error
    }

    async function signOut(): Promise<void> {
        queryClient.clear();
        await queryClient.invalidateQueries();
        await supabase.auth.signOut()
    }

    return (
        <ApplicationContext.Provider value={{ signIn, signUp, signOut }}>
            {children}
        </ApplicationContext.Provider>
    )
}

export function useApplication(): ApplicationContextValue {
    const ctx = React.useContext(ApplicationContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
