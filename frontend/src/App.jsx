import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate
} from 'react-router-dom'

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
  const { token, userData } = useAuth()
  const isLogged = Boolean(token)
  const isCollaborator = userData?.collaborator === true

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        {/* públicas */}
        <Route index element={<Home />} />
        <Route path='/news/:id' element={<News />} />
        <Route path='/user-profile/:id' element={<UserProfile />} />

        {/* NÃO logados */}
        <Route
          path='/login'
          element={!isLogged ? <Login /> : <Navigate to='/' replace />}
        />
        <Route
          path='/new-account'
          element={!isLogged ? <NewAccount /> : <Navigate to='/' replace />}
        />
        <Route
          path='/forgot-password'
          element={!isLogged ? <ForgotPassword /> : <Navigate to='/' replace />}
        />

        {/* Logados não colaboradores */}
        <Route
          path='/be-collaborator'
          element={
            isLogged && !isCollaborator ? (
              <BeCollaborator />
            ) : (
              <Navigate to='/' replace />
            )
          }
        />

        {/* Colaboradores */}
        <Route
          path='/add-news'
          element={
            isLogged && isCollaborator ? <AddNews /> : <Navigate to='/' replace />
          }
        />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App