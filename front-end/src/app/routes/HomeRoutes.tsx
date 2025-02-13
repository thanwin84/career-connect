import { HomePageLayout } from '../../layout';

import { Login, Error, HomePage } from '../../pages';
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { routes } from '../constants/routes';
import PublicRoute from './PublicRoute';
import { LoadingPage } from '../../components/ui';

const FindJobs = lazy(() => import('../../features/find_jobs/pages/FindJobs'));
const Register = lazy(() => import('../../features/auth/pages/Register'));

const HomeRoutes = (
  <>
    <Route>
      <Route
        path={routes.HOME}
        element={<HomePageLayout />}
        errorElement={<Error />}
      >
        <Route index element={<HomePage />} />
        <Route
          path={routes.JOBS}
          element={
            <Suspense fallback={<LoadingPage />}>
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
    </Route>
    <Route element={<PublicRoute />}>
      <Route path={routes.LOGIN} element={<Login />} />
      <Route
        path={routes.REGISTER}
        element={
          <Suspense>
            <Register />
          </Suspense>
        }
      />
    </Route>
  </>
);
export default HomeRoutes;
