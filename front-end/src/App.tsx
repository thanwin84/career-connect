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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {HomeRoutes}
        {DashboardRoutes}
        <Route path="/test" element={<Test />} />
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
