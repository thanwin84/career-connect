export const hasPermission = (permissions: string[], permission: string) => {
  if (!permissions) return false;
  return permissions.includes(permission);
};
