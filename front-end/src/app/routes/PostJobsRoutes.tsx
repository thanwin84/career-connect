import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PostJobsLayout from '../../layout/PostJobsLayout';
import AddJob from '../../features/manage-job-post/pages/AddJob';
import { lazy, Suspense } from 'react';
import { action as deleteJobAction } from '../../pages/DeleteJob';
import Candidate from '../../features/manage-job-post/pages/Candidate';
import Interviews from '../../features/manage-job-post/pages/Interviews';

const AllJobs = lazy(
  () => import('../../features/manage-job-post/pages/PostedJobs')
);
const EditJob = lazy(
  () => import('../../features/manage-job-post/pages/EditJob')
);
const PostJobsRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route path="post-jobs" element={<PostJobsLayout />}>
      <Route
        index
        element={<AddJob />}
        loader={async () => {
          const { loader } = await import(
            '../../features/manage-job-post/pages/AddJob'
          );
          return loader({});
        }}
      />
      <Route
        path="jobs"
        element={
          <Suspense>
            <AllJobs />
          </Suspense>
        }
        loader={async (args) => {
          const { loader } = await import(
            '../../features/manage-job-post/pages/PostedJobs'
          );
          return loader(args);
        }}
      />
      <Route
        path="edit/:jobId"
        element={
          <Suspense>
            <EditJob />
          </Suspense>
        }
        loader={async (args) => {
          const { loader } = await import(
            '../../features/manage-job-post/pages/EditJob'
          );
          return loader(args);
        }}
      />
      <Route path="candidates" element={<Candidate />} />
      <Route path="interviews" element={<Interviews />} />
      <Route path="delete-job/:id" action={deleteJobAction} />
    </Route>
  </Route>
);
export default PostJobsRoutes;
