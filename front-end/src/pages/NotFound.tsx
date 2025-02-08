import { Link } from 'react-router-dom';
import { routes } from '../app/constants/routes';

type Props = {
  className?: string;
};

export default function NotFound({}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-700 mt-4">
          Oops! Page not found
        </h2>
        <p className="text-gray-600 mt-4 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to={routes.HOME}
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg
            hover:bg-blue-700 transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
