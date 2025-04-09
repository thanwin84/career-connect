import { useUserStore } from '@/lib/store/userStore';
import { useParams } from 'react-router-dom';

type Props = {
  requiredPermissions: string[];
  children: React.ReactNode;
};

export function CanAccess({ requiredPermissions, children }: Props) {
  const userStore = useUserStore();
  const permissions = userStore.permissions;
  const { userId } = useParams();

  const owner = userStore.user?._id === userId;
  const hasPermission = requiredPermissions.some((permission) =>
    permissions.includes(permission)
  );
  if (hasPermission || owner) {
    return <>{children}</>;
  }
  return null;
}
