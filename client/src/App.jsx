import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import {
  HomeLayout,
  Landing,
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
  AddEducation,
  CreateAccountPageLayout,
  HomePageLayout,
  FindJobs
} from './pages'


import {loader as dashboardLoader} from './pages/DashboardLayout'
import { loader as addJobLoader} from './pages/AddJob'
import { loader as allJobsLoader } from './pages/AllJobs'
import {  loader as editJobLoader } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'
import { loader as adminLoader } from './pages/Admin'
import { loader as statsLoader } from './pages/Stats'
import {loader as settingPageLayoutLoader} from './pages/SettingPageLayout'
import { loader as findJobsLoader} from './pages/FindJobs'

import { CentralProvider } from './contexts/MainContext'


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
        element: <CreateAccountPageLayout />
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
            loader: addJobLoader
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
            element: <EditProfile/>
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader
          },
          {

            path: 'edit-job/:id',
            element: <EditJob />,
            loader: editJobLoader
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
  },
  {
    path: "testing",
    element: <h2>testing</h2>
  },
  {
    path: "/home",
    element: <HomePageLayout />,
    children: [
      {
        index: true,
        element: <FindJobs />,
        loader: findJobsLoader
      }
    ]
  }
  
])
function App() {
  

  return (
    <CentralProvider>
      <RouterProvider router={router} />
    </CentralProvider>
  )
}

export default App