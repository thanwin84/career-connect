import { useCreateUser } from '@/hooks/api';
import { UserFormType } from '@/lib/schemas';
import { createContext, ReactNode, useContext, useState } from 'react';

type PartialUser = Omit<Partial<UserFormType>, 'educationRecords'>;
type RegisterContextType = {
  user: PartialUser;
  handleAddUser: (data: PartialUser) => void;
  submitRegistration: (file: File | null) => void;
  isFormPending: boolean;
};

const registerContext = createContext<RegisterContextType | undefined>(
  undefined
);

export const RegisterProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PartialUser>({});
  const { createUser, isPending: isFormPending } = useCreateUser();
  function handleAddUser(data: PartialUser) {
    setUser((prev) => ({ ...prev, ...data }));
  }
  const submitRegistration = async (file: File | null) => {
    const formData = new FormData();
    formData.append('firstName', user.firstName as string);
    formData.append('lastName', user.lastName as string);
    formData.append('email', user.email as string);
    formData.append('password', user.password as string);
    formData.append('location[city]', user.location?.city as string);
    formData.append('location[country]', user.location?.country as string);
    formData.append('role', user.role as string);
    if (file) {
      formData.append('avatar', file);
    }

    await createUser(formData);
  };
  return (
    <registerContext.Provider
      value={{
        user,
        handleAddUser,
        submitRegistration,
        isFormPending,
      }}
    >
      {children}
    </registerContext.Provider>
  );
};

export const useRegisterContext = () => {
  const context = useContext(registerContext);
  if (!context) {
    throw new Error(
      'useRegisterContext should be used within RegisterProvider'
    );
  }
  return context;
};
