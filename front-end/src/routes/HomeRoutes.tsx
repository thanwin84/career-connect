import { LoadingPage } from '@/components/ui';
import { HomePageLayout } from '@/layout';
import { routes } from '@/lib/constants/routes';
import { HomePage, Login } from '@/pages';
import EmailConfirmation from '@/pages/EmailConfirmation';
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import Error from '@/pages/Error';

const FindJobs = lazy(() => import('../app/find_jobs/pages/FindJobs'));
const Register = lazy(() => import('../app/auth/pages/Register'));
const Profile = lazy(() => import('../app/profile/pages/Profile'));

const HomeRoutes = (
  <>
    <Route>
      <Route
        path={routes.HOME}
        element={<HomePageLayout />}
        errorElement={<Error />}
      >
        <Route index element={<HomePage />} />
        <Route path='/users/:userId' element={<Profile />} />
        <Route
          path={routes.JOBS}
          element={
            <Suspense fallback={<LoadingPage />}>
              <FindJobs />
            </Suspense>
          }
          loader={async (args) => {
            const { loader } = await import('../app/find_jobs/pages/FindJobs');
            return loader(args);
          }}
        />
      </Route>
    </Route>
    <Route element={<PublicRoute />}>
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path='/email-confirmation' element={<EmailConfirmation />} />
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
