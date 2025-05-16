import FormInput from '@/components/forms/FormInput';
import { Password, Button } from '@/components/ui';
import { useEmailCheck } from '@/hooks/api';
import { UserFormType, userFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import FormTitle from './FormTitle';
import { useRegisterContext } from '@/contexts';

type BasicInformation = Omit<UserFormType, 'educationRecords' | 'role'>;
type Props = {
  className?: string;
  next: () => void;
};

export default function BasicInformationForm({ next, className }: Props) {
  const [email, setEmail] = useState('');
  const emailExists = useEmailCheck(email);
  const { user, handleAddUser } = useRegisterContext();

  const methods = useForm<BasicInformation>({
    resolver: zodResolver(
      userFormSchema.omit({
        educationRecords: true,
        role: true,
      })
    ),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      password: user.password,
    },
  });
  async function action(formData: BasicInformation) {
    handleAddUser(formData);
    next();
  }
  useEffect(() => {
    if (emailExists) {
      methods.setError('email', { message: 'Email is already registered' });
    } else {
      methods.setError('email', { message: '' });
    }
  }, [emailExists, methods]);

  return (
    <div className={`w-full   mx-auto ${className}`}>
      <FormTitle title='Create your account' />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(action)}
          aria-labelledby='formTitle'
        >
          <div className='flex flex-col gap-3'>
            <div className='flex gap-4'>
              <FormInput
                label='First Name'
                placeholder='Your first name'
                name='firstName'
              />
              <FormInput
                label='Last Name'
                placeholder='Your last name'
                name='lastName'
              />
            </div>
            <div className='flex gap-4'>
              <FormInput label='City' name='location.city' />
              <FormInput label='Country' name='location.country' />
            </div>
            <FormInput
              type='email'
              label='Email'
              placeholder='sample@mail.com'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <Password className='mb-4' />
            <Button classname='w-full'>Next</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
