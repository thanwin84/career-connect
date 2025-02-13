import { lazy, Suspense } from 'react';

import ProtectedRoute from './ProtectedRoute';
import { Route } from 'react-router-dom';
import MyJob from '../../features/manage-my-jobs/pages/MyJob';
import JobDescription from '../../features/manage-my-jobs/components/JobDescription';
import { LoadingPage } from '../../components/ui';

const Profile = lazy(() => import('../../features/user_profile/pages/Profile'));
const EditProfile = lazy(
  () => import('../../features/user_profile/pages/EditProfile')
);
const Setting = lazy(() => import('../../features/setting/pages/Setting'));
const Admin = lazy(() => import('../../features/admin/pages/Admin'));
const Stats = lazy(() => import('../../features/user-stats/pages/Stats'));
const DashboardLayout = lazy(() => import('../../layout/DashboardLayout'));

const DashboardRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route
      path="dashboard"
      element={
        <Suspense fallback={<LoadingPage />}>
          <DashboardLayout />
        </Suspense>
      }
    >
      <Route
        index
        element={
          <Suspense>
            <Stats />
          </Suspense>
        }
        loader={async () => {
          const { loader } = await import(
            '../../features/user-stats/pages/Stats'
          );
          return loader();
        }}
      />
      <Route path="my-jobs">
        <Route index element={<MyJob />} />
        <Route
          path=":jobId"
          element={
            <section className="py-6 px-6">
              <JobDescription />
            </section>
          }
        />
      </Route>
      <Route
        path="profile"
        element={
          <Suspense>
            <Profile />
          </Suspense>
        }
      />
      <Route
        path="profile/edit"
        element={
          <Suspense>
            <EditProfile />
          </Suspense>
        }
      />
      <Route
        path="admin"
        element={<Admin />}
        loader={async () => {
          const { loader } = await import('../../features/admin/pages/Admin');
          return loader();
        }}
      />

      <Route
        path="setting"
        element={
          <Suspense>
            <Setting />
          </Suspense>
        }
      />
    </Route>
  </Route>
);

export default DashboardRoutes;
