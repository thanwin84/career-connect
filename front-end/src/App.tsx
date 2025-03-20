import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import DashboardRoutes from './routes/DashbooardRoutes';
import HomeRoutes from './routes/HomeRoutes';
import AuthBroadcast from './auth/AuthBroadCast';
import Test from './components/Test';
import PostJobsRoutes from './routes/PostJobsRoutes';
import NotFound from './pages/NotFound';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {HomeRoutes}
        {DashboardRoutes}
        {PostJobsRoutes}
        <Route path="/email-verify" element={<VerifyEmail />} />
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
