import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {
  HomeLayout,
  Landing,
  Register,
  Login,
  Error,
  DashboardLayout,
  AddJob,
  AllJobs,
  Profile,
  Admin,
  Stats
} from './pages'
import { action as registerAction } from './pages/Register'
import {action as loginAction} from './pages/Login'
import {loader as dashboardLoader} from './pages/DashboardLayout'


const checkDefaultTheme = ()=>{
  const theme = localStorage.getItem('themeMode')
  document.querySelector('html').classList.remove("light", "dark")
  document.querySelector('html').classList.add(theme)
  return theme
}
const theme = checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Landing/>
      },
      {
        path: "register",
        element: <Register/>,
        action: registerAction
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction
      },
      {
        path: "dashboard",
        element: <DashboardLayout defaultTheme={theme} />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />
          },
          {
            path: 'all-jobs',
            element: <AllJobs />
          },
          {
            path: 'profile',
            element: <Profile />
          },
          {
            path: 'admin',
            element: <Admin />
          },
          {
            path: 'stats',
            element: <Stats />
          }

        ]
      }
    ]
  }
  
])
function App() {
  

  return <RouterProvider router={router} />
}

export default App
