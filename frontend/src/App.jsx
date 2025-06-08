import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Layout from './components/Layout.jsx'
import { useAuth } from './contexts/AuthContext'

import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import NewAccount from './pages/NewAccount/NewAccount.jsx'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx'
import UserProfile from './pages/UserProfile/UserProfile.jsx'
import News from './pages/News/News.jsx'
import BeCollaborator from './pages/BeCollaborator/BeCollaborator.jsx'
import AddNews from './pages/AddNews/AddNews.jsx'

function App() {
  const { userData, isLoadingUserData } = useAuth()
  const isLogged = Boolean(userData)
  const isCollaborator = userData?.collaborator === true

  if (isLoadingUserData) return null

  const baseRoutes = [
    { index: true, element: <Home /> },
    { path: '/news/:id', element: <News /> },
    { path: '/user-profile/:id', element: <UserProfile /> },
  ]

  const publicRoutes = [
    ...baseRoutes,
    { path: '/login', element: <Login /> },
    { path: '/new-account', element: <NewAccount /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/be-collaborator', element: <Navigate to="/" replace /> },
    { path: '/add-news', element: <Navigate to="/" replace /> },
  ]

  const userRoutes = [
    ...baseRoutes,
    { path: '/login', element: <Navigate to="/" replace /> },
    { path: '/new-account', element: <Navigate to="/" replace /> },
    { path: '/forgot-password', element: <Navigate to="/" replace /> },
    { path: '/be-collaborator', element: <BeCollaborator /> },
    { path: '/add-news', element: <Navigate to="/" replace /> },
  ]

  const collaboratorRoutes = [
    ...baseRoutes,
    { path: '/login', element: <Navigate to="/" replace /> },
    { path: '/new-account', element: <Navigate to="/" replace /> },
    { path: '/forgot-password', element: <Navigate to="/" replace /> },
    { path: '/be-collaborator', element: <Navigate to="/" replace /> },
    { path: '/add-news', element: <AddNews /> },
  ]

  const routesToUse = !isLogged
    ? publicRoutes
    : isCollaborator
      ? collaboratorRoutes
      : userRoutes

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: routesToUse,
    },
  ])

  return <RouterProvider router={router} />
}

export default App