import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../../../../components/ui';
import { Password } from '../../../../components/ui';
import { useForm, FormProvider } from 'react-hook-form';

import FormInput from '../../../../components/forms/FormInput';
import FormTitle from './FormTitle';
import {
  PersonalInfoType,
  RegisterFormType,
  personalInfoSchema,
} from '../../../../lib/schemas/registerSchema';

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
  async function action(formData: PersonalInfoType) {
    setUser(formData);
    next();
  }

  const methods = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: user,
  });
  return (
    <div className={`w-full   mx-auto ${className}`}>
      <FormTitle title="Create your account" />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(action)}
          aria-labelledby="formTitle"
        >
          <div className="flex flex-col gap-3">
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
            />
            <Password className="mb-4" />
            <Button classname="w-full">Next</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
