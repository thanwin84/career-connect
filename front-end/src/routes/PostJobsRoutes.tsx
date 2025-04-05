import Candidate from '@/app/manage-job-post/pages/Candidate';
import Interviews from '@/app/manage-job-post/pages/Interviews';
import PostJobsLayout from '@/layout/PostJobsLayout';
import { lazy, Suspense } from 'react';
import { Route } from 'react-router-dom';
import AddJob from '../app/manage-job-post/pages/AddJob';
import ProtectedRoute from './ProtectedRoute';
import { action as deleteJobAction } from '@/app/manage-job-post/pages/DeleteJob';

const AllJobs = lazy(() => import('@/app/manage-job-post/pages/PostedJobs'));
const EditJob = lazy(() => import('@/app/manage-job-post/pages/EditJob'));
const PostJobsRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route path='post-jobs' element={<PostJobsLayout />}>
      <Route
        index
        element={<AddJob />}
        loader={async () => {
          const { loader } = await import(
            '../app/manage-job-post/pages/AddJob'
          );
          return loader({});
        }}
      />
      <Route
        path='jobs'
        element={
          <Suspense>
            <AllJobs />
          </Suspense>
        }
        loader={async (args) => {
          const { loader } = await import(
            '../app/manage-job-post/pages/PostedJobs'
          );
          return loader(args);
        }}
      />
      <Route
        path='edit/:jobId'
        element={
          <Suspense>
            <EditJob />
          </Suspense>
        }
        loader={async (args) => {
          const { loader } = await import(
            '../app/manage-job-post/pages/EditJob'
          );
          return loader(args);
        }}
      />
      <Route path='candidates' element={<Candidate />} />
      <Route path='interviews' element={<Interviews />} />
      <Route path='delete-job/:id' action={deleteJobAction} />
    </Route>
  </Route>
);
export default PostJobsRoutes;
