import { useLocation, useNavigate } from 'react-router-dom';

const privatePaths = ['/dashboard', '/posted-jobs'];

export const usePostLogoutRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectIfNeeded = () => {
    const isPrivatePath = privatePaths.some((path) =>
      location.pathname.includes(path)
    );
    if (isPrivatePath) {
      navigate('/', { replace: true });
    }
  };

  return redirectIfNeeded;
};
