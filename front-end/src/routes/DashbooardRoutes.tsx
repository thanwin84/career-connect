import { lazy, Suspense } from "react";

import { action as deleteJobAction } from "../pages/DeleteJob";
import ProtectedRoute from "../auth/ProtectedRoute";
import { Route } from "react-router-dom";
import { checkDefaultTheme } from "../utils/checkDefaultTheme";
import MyJob from "../pages/MyJob";
import JobDescription from "../components/myjobs/JobDescription";
import { Theme } from "../types";

const AllJobs = lazy(() => import("../pages/AllJobs"));
const AddJob = lazy(() => import("../pages/AddJob"));
const EditJob = lazy(() => import("../pages/EditJob"));
const Profile = lazy(() => import("../pages/Profile"));
const EditProfile = lazy(() => import("../pages/EditProfile"));
const Setting = lazy(() => import("../pages/Setting"));
const Admin = lazy(() => import("../pages/Admin"));
const Stats = lazy(() => import("../pages/Stats"));
const DashboardLayout = lazy(
  () => import("../layout/user-dashboard/DashboardLayout")
);

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
          const { loader } = await import("../pages/AddJob");
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
          const { loader } = await import("../pages/AllJobs");
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
          const { loader } = await import("../pages/Admin");
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
          const { loader } = await import("../pages/EditJob");
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
          const { loader } = await import("../pages/Stats");
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
