import { Button } from '@/components/ui';
import FormError from '@/components/ui/FormError';
import TransitionPage from '@/components/ui/TransitionPage';
import { userFormSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FormTitle from './FormTitle';
import { constants } from '@/config/appConfig';
import { useRegisterContext } from '@/contexts';

const RoleFormSchema = userFormSchema.pick({ role: true });
type RoleType = z.infer<typeof RoleFormSchema>;

type Props = {
  className?: string;
  next: () => void;
  goBack: () => void;
};
const options = [
  { text: "I'm a recruiter", value: constants.UserRoles.RECRUITER },
  { text: "I'm a job seeker", value: constants.UserRoles.USER },
];

export default function RoleForm({ className, next, goBack }: Props) {
  const { user, handleAddUser } = useRegisterContext();
  const { handleSubmit, formState, register, watch } = useForm<RoleType>({
    resolver: zodResolver(RoleFormSchema),
    defaultValues: {
      role: user?.role,
    },
  });

  async function action(form: RoleType) {
    next();
    handleAddUser({ role: form.role });
  }
  const selected = watch('role');
  return (
    <TransitionPage>
      <form onSubmit={handleSubmit(action)} className={`w-full ${className}`}>
        <FormTitle title='What brings to Career Connect?' />
        <ul className='mb-1 flex flex-col'>
          {options.map(({ text, value }) => (
            <label
              className={`py-2 px-4 text-lg border mb-4 rounded-md bg-white   cursor-pointer ${
                selected === value
                  ? 'border-2 border-blue-600'
                  : 'border-2 hover:border-blue-500'
              } `}
              key={text}
            >
              <input
                value={value}
                type='radio'
                {...register('role')}
                className='hidden'
              />
              {text}
            </label>
          ))}
        </ul>

        {formState.errors.role?.message && (
          <FormError
            className='ml-2 text-base'
            message={formState.errors.role?.message}
            id='user-type-error'
          />
        )}
        <div className='flex justify-between gap-4 mt-2'>
          <Button
            type='button'
            classname='w-24'
            onClick={goBack}
            category='normal'
          >
            Back
          </Button>
          <Button disabled={!selected} type='submit' classname='w-24'>
            Next
          </Button>
        </div>
      </form>
    </TransitionPage>
  );
}
