import { useRouteError } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import { Link } from 'react-router-dom';

type RouteError = {
  status?: number;
};
export default function Error() {
  const error = useRouteError() as RouteError;

  if (error.status === 404) {
    return (
      <div className="h-screen">
        <img className="h-4/6 w-full" src={img} alt="not-found" />
        <div className="text-center">
          <h3 className="text-2xl text-gray-800 font-bold">Page not found</h3>
          <p className="text-lg text-gray-600 mb-4">
            The page you are looking for does not exist
          </p>
          <Link
            className="text-xl text-blue-500 hover:text-blue-700 hover:underline"
            to="/dashboard"
          >
            Back Home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <section>
      <h1 className="text-2xl">Something went wrong</h1>
    </section>
  );
}
