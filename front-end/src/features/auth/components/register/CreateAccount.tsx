import { zodResolver } from '@hookform/resolvers/zod';
import { FormData } from '../../../../types';
import { Button } from '../../../../components/ui';
import { Password } from '../../../../components/ui';
import { useForm, FormProvider } from 'react-hook-form';
import {
  personalInfoSchema,
  PersonalInfoType,
  RegisterFormType,
} from '../../validations';
import FormInput from '../../../../components/forms/FormInput';
import FormTitle from './FormTitle';

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
  async function action(formData: FormData) {
    setUser(formData as PersonalInfoType);
    next();
  }

  const methods = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: user,
  });
  return (
    <div
      className={`w-full   dark:bg-zinc-900  bg-white px-6 py-4 rounded-md mx-auto ${className}`}
    >
      <FormTitle title="Create your account" />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(action)}
          aria-labelledby="formTitle"
        >
          <div className="flex flex-col gap-3">
            <FormInput
              label="First Name"
              placeholder="Enter your first Name"
              name="firstName"
            />
            <FormInput
              label="Last Name"
              placeholder="Enter your last name"
              name="lastName"
            />
            <FormInput
              label="Location"
              placeholder="Enter your location"
              name="location"
            />
            <FormInput
              type="email"
              label="Email"
              placeholder="Enter your email"
              name="email"
            />
            <Password className="mb-4" />
            <Button classname="self-end">Next</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
