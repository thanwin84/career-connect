import { zodResolver } from '@hookform/resolvers/zod';
import { Password, Button } from '../../../../components/ui';
import { useForm, FormProvider } from 'react-hook-form';

import FormInput from '../../../../components/forms/FormInput';
import FormTitle from './FormTitle';
import {
  PersonalInfoType,
  RegisterFormType,
  personalInfoSchema,
} from '../../../../lib/schemas/registerSchema';
import { useState } from 'react';
import { useEmailCheck } from '../../hooks/useEmailCheck';

type Props = {
  className?: string;
  next: () => void;
  setUser: (data: PersonalInfoType) => void;
  user: Partial<RegisterFormType>;
};

export default function CreateAccount({
  next,
  setUser,
  className,
  user,
}: Props) {
  const [email, setEmail] = useState('');
  const emailExists = useEmailCheck(email);
  const emailErrorMessage = emailExists ? 'Email is already registered' : '';

  const methods = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: user,
  });
  async function action(formData: PersonalInfoType) {
    setUser(formData);
    if (!emailErrorMessage) {
      next();
    }
  }

  return (
    <div className={`w-full   mx-auto ${className}`}>
      <FormTitle title="Create your account" />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(action)}
          aria-labelledby="formTitle"
        >
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <FormInput
                label="First Name"
                placeholder="Your first name"
                name="firstName"
              />
              <FormInput
                label="Last Name"
                placeholder="Your last name"
                name="lastName"
              />
            </div>
            <FormInput
              label="Location"
              placeholder="Dhaka, Bangladesh"
              name="location"
            />
            <FormInput
              type="email"
              label="Email"
              placeholder="sample@mail.com"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              serverErrorMessage={emailErrorMessage}
            />
            <Password className="mb-4" />
            <Button classname="w-full">Next</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
