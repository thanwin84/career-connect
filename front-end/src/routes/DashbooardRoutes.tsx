import { lazy, Suspense } from 'react';

import { action as deleteJobAction } from '../pages/DeleteJob';
import ProtectedRoute from './ProtectedRoute';
import { Route } from 'react-router-dom';
import { checkDefaultTheme } from '../utils/checkDefaultTheme';
import MyJob from '../features/manage-my-jobs/pages/MyJob';
import JobDescription from '../features/manage-my-jobs/components/JobDescription';
import { Theme } from '../types';

const AllJobs = lazy(
  () => import('../features/manage-job-post/pages/PostedJobs')
);
const AddJob = lazy(() => import('../features/manage-job-post/pages/AddJob'));
const EditJob = lazy(() => import('../features/manage-job-post/pages/EditJob'));
const Profile = lazy(() => import('../features/user_profile/pages/Profile'));
const EditProfile = lazy(
  () => import('../features/user_profile/pages/EditProfile')
);
const Setting = lazy(() => import('../features/setting/pages/Setting'));
const Admin = lazy(() => import('../features/admin/pages/Admin'));
const Stats = lazy(() => import('../features/user-stats/pages/Stats'));
const DashboardLayout = lazy(() => import('../layout/DashboardLayout'));

const theme = checkDefaultTheme() as Theme;

const DashboardRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route
      path="dashboard"
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
            <AddJob />
          </Suspense>
        }
        loader={async () => {
          const { loader } = await import(
            '../features/manage-job-post/pages/AddJob'
          );
          return loader({});
        }}
      />
      <Route
        path="all-jobs"
        element={
          <Suspense>
            <AllJobs />
          </Suspense>
        }
        loader={async (args) => {
          const { loader } = await import(
            '../features/manage-job-post/pages/PostedJobs'
          );
          return loader(args);
        }}
      />
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
          const { loader } = await import('../features/admin/pages/Admin');
          return loader();
        }}
      />
      <Route
        path="edit-job/:id"
        element={
          <Suspense>
            <EditJob />
          </Suspense>
        }
        loader={async (args) => {
          const { loader } = await import(
            '../features/manage-job-post/pages/EditJob'
          );
          return loader(args);
        }}
      />
      <Route path="delete-job/:id" action={deleteJobAction} />
      <Route
        path="stats"
        element={
          <Suspense>
            <Stats />
          </Suspense>
        }
        loader={async () => {
          const { loader } = await import('../features/user-stats/pages/Stats');
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
