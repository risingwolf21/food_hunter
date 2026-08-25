import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import { AppShell } from './components/app-shell'
import { AuthProvider } from './contexts/auth-context'
import { LoginPage } from './pages/auth/login-page'
import { RegisterPage } from './pages/auth/register-page'
import { ListPage } from './pages/list-page'
import { MapPage } from './pages/map-page'
import { NotFoundPage } from './pages/not-found-page'
import { ProfilePage } from './pages/profile-page'
import { FriendsPage } from './pages/friends-page'
import { FriendsActivityPage } from './pages/friends-activity-page'
import { RestaurantPageProvider } from './pages/restaurant-page-provider'


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
      <AuthProvider>
        <AppShell />
      </AuthProvider>
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
        path: '/feed',
        element: <FriendsActivityPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/friends',
        element: <FriendsPage />,
      },
      {
        path: 'restaurant/:restaurantId',
        element: <RestaurantPageProvider />,
      },
      {
        path: '*',
        element: <Navigate to="/map" replace />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}

export default App
