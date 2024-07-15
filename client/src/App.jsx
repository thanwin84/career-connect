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
  EditProfile,
  SettingPageLayout,
  PasswordAndSecurity,
  Account,
  AddEducation
} from './pages'


import {loader as dashboardLoader} from './pages/DashboardLayout'
import { action as addjobAction} from './pages/AddJob'
import { loader as allJobsLoader } from './pages/AllJobs'
import { action as editJobAction, loader as editJobLoader } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'
import { loader as adminLoader } from './pages/Admin'
import { action as EditProfileAction } from './pages/EditProfile'
import { loader as statsLoader } from './pages/Stats'
import {loader as settingPageLayoutLoader} from './pages/SettingPageLayout'

// testing
import SelectCountry from './components/SelectCountry'

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
        path: "/testing-route",
        element: <SelectCountry />
      },
      {
        index: true,
        element: <Landing/>
      },
      {
        path: "register",
        element: <Register/>
      },
      {
        path: "login",
        element: <Login />
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
            element: <SettingPageLayout />,
            loader: settingPageLayoutLoader,
            children: [
              {
                element: <Account />,
                index: true
              },
              {
                path: "password-and-security",
                element: <PasswordAndSecurity />
              }
            ]
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
