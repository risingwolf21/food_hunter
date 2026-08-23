import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AppShell } from './components/app-shell'
import { useAuth } from './contexts/auth-context'
import { LoginPage } from './pages/auth/login-page'
import { RegisterPage } from './pages/auth/register-page'
import { ListPage } from './pages/list-page'
import { MapPage } from './pages/map-page'
import { NotFoundPage } from './pages/not-found-page'
import { ProfilePage } from './pages/profile-page'
import { RestaurantPage } from './pages/restaurant-page'

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/map" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <AppShell />
      </AuthGuard>
    ),
    children: [
      {
        path: '/map',
        element: <MapPage />,
      },
      {
        path: '/list',
        element: <ListPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '*',
        element: <Navigate to="/map" replace />,
      },
    ],
  },

  {
    path: 'restaurant/:restaurantId',
    element: <RestaurantPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
], {
  basename: "/food_hunter"
})

export function App() {
  return <RouterProvider router={router} />
}

export default App
