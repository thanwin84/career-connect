
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider
} from 'react-router-dom'

import DashboardRoutes from './routes/DashbooardRoutes'
import HomeRoutes from './routes/HomeRoutes'


function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    {HomeRoutes}
    {DashboardRoutes}
    </>
  ))
  return (
    <RouterProvider router={router} />
  )
}

export default App