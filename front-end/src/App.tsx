
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider
} from 'react-router-dom'

import DashboardRoutes from './routes/DashbooardRoutes'
import HomeRoutes from './routes/HomeRoutes'
import AuthBroadcast from './auth/AuthBroadCast'



function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <>
      {HomeRoutes}
      {DashboardRoutes}
    </>
  ))

  

  return (
    <>
    <RouterProvider router={router} />
    <AuthBroadcast/>
    </>
  )
}

export default App