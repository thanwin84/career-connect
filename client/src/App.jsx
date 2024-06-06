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
  Stats,
  EditJob
} from './pages'
import { action as registerAction } from './pages/Register'
import {action as loginAction} from './pages/Login'
import {loader as dashboardLoader} from './pages/DashboardLayout'
import { action as addjobAction} from './pages/AddJob'
import { loader as allJobsLoader } from './pages/AllJobs'
import { action as editJobAction, loader as editJobLoader } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'

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
            element: <AddJob />,
            action: addjobAction
          },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: allJobsLoader
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

            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction
          },
          {
            path: "delete-job/:id",
            action: deleteJobAction
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
