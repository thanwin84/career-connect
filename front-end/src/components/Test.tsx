import Status from '../features/manage-job-post/components/candidates/Status';
import User from '../features/manage-job-post/components/candidates/User';

export default function Test() {
  return (
    <div className="p-6">
      <User name="Than Win" imgSrc="" />
      <Status type="hired" />
    </div>
  );
}
