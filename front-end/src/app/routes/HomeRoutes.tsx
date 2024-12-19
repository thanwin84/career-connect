import { HomePageLayout } from '../../layout';

import { Login, Error, HomePage } from '../../pages';
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { routes } from '../constants/routes';
import ProtectedRoute from './ProtectedRoute';
const FindJobs = lazy(() => import('../../features/find_jobs/pages/FindJobs'));
const Register = lazy(() => import('../../features/auth/pages/Register'));

const HomeRoutes = (
  <Route>
    <Route
      path={routes.HOME}
      element={<HomePageLayout />}
      errorElement={<Error />}
    >
      <Route index element={<HomePage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path={routes.JOBS}
          element={
            <Suspense fallback={<div>Loading..</div>}>
              <FindJobs />
            </Suspense>
          }
          loader={async (args) => {
            const { loader } = await import(
              '../../features/find_jobs/pages/FindJobs'
            );
            return loader(args);
          }}
        />
      </Route>
      <Route
        path={routes.REGISTER}
        element={
          <Suspense>
            <Register />
          </Suspense>
        }
      />
      <Route path={routes.LOGIN} element={<Login />} />
    </Route>
  </Route>
);
export default HomeRoutes;
