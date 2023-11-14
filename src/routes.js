import { Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import UserInfo from './pages/User/UserInfo'
import UserEdit from './pages/User/UserEdit'
import UserAdd from './pages/User/UserAdd'
import UserList from './pages/User/UserList'

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },

      { path: 'app/user/:id', element: <UserInfo /> },
      { path: 'app/user/edit/:id', element: <UserEdit /> },
      { path: 'app/user/add', element: <UserAdd /> },
      { path: 'app/users', element: <UserList /> },

      { path: '', element: <Navigate to="/app/users" /> },

      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="login" /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
]

export default routes
