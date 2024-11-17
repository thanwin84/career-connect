
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
  AddEducation,
  CreateAccountPageLayout,
  HomePageLayout,
  FindJobs,
  Setting
} from './pages'


import {loader as dashboardLoader} from './pages/DashboardLayout'
import { loader as addJobLoader} from './pages/AddJob'
import { loader as allJobsLoader } from './pages/AllJobs'
import {  loader as editJobLoader } from './pages/EditJob'
import { action as deleteJobAction } from './pages/DeleteJob'
import { loader as adminLoader } from './pages/Admin'
import { loader as statsLoader } from './pages/Stats'
import { loader as findJobsLoader} from './pages/FindJobs'
const checkDefaultTheme = ()=>{
  const theme = localStorage.getItem('themeMode') as string
  const html = document.querySelector('html')
  if (html){
    html.classList.remove("light", "dark")
    html.classList.add(theme)
  }
  return theme
}
const theme = checkDefaultTheme()
// testing


const router = createBrowserRouter([
  {
    
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error/>,
    children: [
      {
        path: "testing",
        
      },
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
            element: <Setting />
          }

        ]
      }
    ]
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
    <RouterProvider router={router} />
  )
}

export default App