
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider
} from 'react-router-dom'

import { 
  HomePageLayout, 
  DashboardLayout 
} from './layout'
import {
  Login,
  Error,
  AddJob,
  AllJobs,
  Admin,
  Stats,
  EditJob,
  Profile,
  EditProfile,
  Register,
  FindJobs,
  Setting,
  HomePage
} from './pages'


// import {loader as dashboardLoader} from './layout/DashboardLayout'
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
// import Test from './components/Test'
import ProtectedRoute from './auth/ProtectedRoute'

function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <Route>
      <Route path="/" element={<HomePageLayout/>} errorElement={<Error/>} >
      <Route index element={<HomePage />}  />
      <Route element={<ProtectedRoute/>}>
        <Route path='jobs' element={<FindJobs />} loader={findJobsLoader} />
      </Route>
      <Route path='register' element={<Register />}  />
      <Route path='login' element={<Login />}  />
    </Route>
    <Route element={<ProtectedRoute/>}>
      <Route path='dashboard' element={<DashboardLayout defaultTheme={theme} />}  >
        <Route index element={<AddJob/>} loader={addJobLoader} />
        <Route path='all-jobs' element={<AllJobs/>} loader={allJobsLoader} />
        <Route path='profile' element={<Profile/>}  />
        <Route path='profile/edit' element={<EditProfile/>}  />
        <Route path='admin' element={<Admin/>}  loader={adminLoader} />
        <Route path='edit-job/:id' element={<EditJob/>}  loader={editJobLoader} />
        <Route path='delete-job/:id'   action={deleteJobAction} />
        <Route path='stats' element={<Stats />}  loader={statsLoader} />
        <Route path='setting' element={<Setting />}  />
      </Route>
    </Route>
    </Route>
  ))
  return (
    <RouterProvider router={router} />
  )
}

export default App