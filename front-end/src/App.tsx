
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider
} from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { 
  HomePageLayout,
} from './layout'

import {
  Login,
  Error,
  HomePage
} from './pages'



import { action as deleteJobAction } from './pages/DeleteJob'


const FindJobs = lazy(()=> import('./pages/FindJobs'))
const Register = lazy(()=> import("./pages/Register"))
const AllJobs = lazy(()=> import("./pages/AllJobs"))
const AddJob = lazy(()=> import("./pages/AddJob"))
const EditJob = lazy(()=> import("./pages/EditJob"))
const Profile = lazy(()=> import("./pages/Profile"))
const EditProfile = lazy(()=> import("./pages/EditProfile"))
const Setting = lazy(()=> import("./pages/Setting"))
const Admin = lazy(()=> import("./pages/Admin"))
const Stats = lazy(()=> import("./pages/Stats"))
const DashboardLayout = lazy(()=> import("./layout/DashboardLayout"))

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
        <Route 
          path='jobs' 
          element={
          <Suspense fallback={<div>Loading..</div>}>
            <FindJobs />
          </Suspense>} 
          loader={async(args)=>{
            const {loader} = await import("./pages/FindJobs")
            return loader(args);
        }} />
      </Route>
      <Route 
        path='register' 
        element={
          <Suspense>
            <Register />
          </Suspense>
        }  
      />
      <Route path='login' element={<Login />}  />
    </Route>
    <Route element={<ProtectedRoute/>}>
      <Route 
        path='dashboard' 
        element={
          <Suspense>
            <DashboardLayout defaultTheme={theme} />
          </Suspense>
        }  
      >
        <Route 
          index 
          element={
            <Suspense>
              <AddJob/>
            </Suspense>
          } 
          loader={async ()=>{
            const {loader} = await import("./pages/AddJob")
            return loader({})
          }} 
        />
        <Route 
          path='all-jobs' 
          element={
            <Suspense>
              <AllJobs/>
            </Suspense>
          } 
          loader={async(args)=>{
            const {loader} = await import("./pages/AllJobs")
            return loader(args)
          }} 
        />
        <Route 
          path='profile' 
          element={
            <Suspense>
              <Profile/>
            </Suspense>
          }  
        />
        <Route 
          path='profile/edit' 
          element={
            <Suspense>
              <EditProfile/>
            </Suspense>
          }  
        />
        <Route 
          path='admin' 
          element={<Admin/>}  
          loader={async()=>{
            const {loader} = await import('./pages/Admin')
            return loader()
          }} 
        />
        <Route 
          path='edit-job/:id' 
          element={
            <Suspense>
              <EditJob/>
            </Suspense>
          }  
          loader={async (args)=>{
            const {loader} = await import("./pages/EditJob")
            return loader(args)
          }} 
        />
        <Route path='delete-job/:id'   action={deleteJobAction} />
        <Route 
          path='stats' 
          element={
            <Suspense>
              <Stats />
            </Suspense>
          }  
          loader={async()=>{
            const {loader} = await import("./pages/Stats")
            return loader()
          }} 
        />
        <Route 
          path='setting' 
          element={
            <Suspense>
              <Setting />
            </Suspense>
          }  
          />
      </Route>
    </Route>
    </Route>
  ))
  return (
    <RouterProvider router={router} />
  )
}

export default App