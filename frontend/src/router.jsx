import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import Login from './pages/Login/Login.jsx'
import NewAccount from './pages/NewAccount/NewAccount.jsx'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.jsx'
import UserProfile from './pages/UserProfile/UserProfile.jsx'
import News from './pages/News/News.jsx'
import BeCollaborator from './pages/BeCollaborator/BeCollaborator.jsx'
import AddNews from './pages/AddNews/AddNews.jsx'

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/new-account' element={<NewAccount />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/user-profile/:id' element={<UserProfile />} />
      <Route path='/news/:id' element={<News />} />
      <Route path='/be-collaborator' element={<BeCollaborator />} />
      <Route path='/add-news' element={<AddNews />} />
    </Route>
  )
)

export default Router
