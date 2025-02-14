import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import DashboardRoutes from './app/routes/DashbooardRoutes';
import HomeRoutes from './app/routes/HomeRoutes';
import AuthBroadcast from './app/auth/AuthBroadCast';
import Test from './components/Test';
import PostJobsRoutes from './app/routes/PostJobsRoutes';
import NotFound from './pages/NotFound';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {HomeRoutes}
        {DashboardRoutes}
        {PostJobsRoutes}

        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <AuthBroadcast />
    </>
  );
}

export default App;
