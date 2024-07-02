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
  Admin,
  Stats,
  EditJob,
  Profile,
  EditProfile
} from './pages'

import { action as registerAction } from './pages/Register'
import {action as loginAction} from './pages/Login'
import {loader as dashboardLoader} from './pages/DashboardLayout'
import { action as addjobAction} from './pages/AddJob'
import { loader as allJobsLoader } from './pages/AllJobs'
import { action as editJobAction, loader as editJobLoader } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'
import { loader as adminLoader } from './pages/Admin'
import { action as EditProfileAction } from './pages/EditProfile'
import { loader as statsLoader } from './pages/Stats'
import Setting from './pages/Setting'
/// testing
import AddEducation from './components/education/AddEducation'

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
            element: <Profile/>,
           
          },
          {
            path: "profile/edit",
            element: <EditProfile/>,
            action: EditProfileAction
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader
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
            element: <Stats />,
            loader: statsLoader
          },
          {
            path: "testing",
            element: <AddEducation/>
          },
          {
            path: "setting",
            element: <Setting />
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
