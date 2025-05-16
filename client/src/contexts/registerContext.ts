import { UserFormType } from '@/lib/schemas';
import { createContext, useContext } from 'react';

export type PartialUser = Omit<Partial<UserFormType>, 'educationRecords'>;
type RegisterContextType = {
  user: PartialUser;
  handleAddUser: (data: PartialUser) => void;
  submitRegistration: (file: File | null) => void;
  isFormPending: boolean;
};

export const registerContext = createContext<RegisterContextType | undefined>(
  undefined
);

export const useRegisterContext = () => {
  const context = useContext(registerContext);
  if (!context) {
    throw new Error(
      'useRegisterContext should be used within RegisterProvider'
    );
  }
  return context;
};
