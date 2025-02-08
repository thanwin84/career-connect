import { Button } from '../../../../components/ui';
import { useForm } from 'react-hook-form';
import FormError from '../../../../components/ui/FormError';
import { FormData, UserRole } from '../../../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  describeYourselfSchema,
  DescribeYourselfType,
} from '../../validations';
import FormTitle from './FormTitle';

type Props = {
  className?: string;
  next: () => void;
  goBack: () => void;
  setUser: (values: { role: UserRole }) => void;
};
const options = [
  { text: "I'm a recruiter", value: 'recruiter' },
  { text: "I'm a job seeker", value: 'user' },
];

export default function DescribeYourself({
  className,
  next,
  goBack,
  setUser,
}: Props) {
  const { handleSubmit, formState, register, watch } =
    useForm<DescribeYourselfType>({
      resolver: zodResolver(describeYourselfSchema),
    });

  async function action(form: FormData) {
    next();
    setUser({ role: form.role });
  }
  const selected = watch('role');
  return (
    <form onSubmit={handleSubmit(action)} className={`w-full ${className}`}>
      <FormTitle title="What brings to Career Connect?" />
      <ul className="mb-1 flex flex-col">
        {options.map(({ text, value }) => (
          <label
            className={`py-2 px-4 text-lg border mb-4 rounded-md bg-white   cursor-pointer ${
              selected === value
                ? 'border-2 border-slate-500'
                : 'border-2 hover:border-slate-500'
            } `}
            key={text}
          >
            <input
              value={value}
              type="radio"
              {...register('role')}
              className="hidden"
            />
            {text}
          </label>
        ))}
      </ul>

      {formState.errors.role?.message && (
        <FormError
          className="ml-2 text-base"
          message={formState.errors.role?.message}
          id="user-type-error"
        />
      )}
      <div className="flex justify-between gap-4 mt-2">
        <Button
          type="button"
          classname="w-24"
          onClick={goBack}
          category="normal"
        >
          Back
        </Button>
        <Button disabled={!selected} type="submit" classname="w-24">
          Next
        </Button>
      </div>
    </form>
  );
}
