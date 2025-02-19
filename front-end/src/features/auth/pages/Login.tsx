import { Button, LoadingPage, Password } from '../../../components/ui';
import { Link } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema, LoginFormType } from '../validations';
import FormInput from '../../../components/forms/FormInput';
import { useLoginUser } from '../hooks/useLoginUser';
import { useUserStore } from '../../../store/userStore';

export default function Login() {
  const methods = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  const { isPending, loginUser } = useLoginUser();
  const { isLoading } = useUserStore();

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="h-screen bg-gray-100 dark:bg-zinc-800 py-8">
      <div className="bg-white  p-8 w-4/6 lg:w-2/5 shadow-lg rounded-md mx-auto  dark:bg-zinc-800">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(loginUser)}>
            <h2 className="text-2xl mb-1 text-blue-800  dark:text-white font-semibold">
              Login
            </h2>
            <p className="text-slate-700 dark:text-slate-300 mb-2">
              Login to land your dream job.
            </p>

            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              className="mb-2"
              name="email"
            />
            <Password className="mb-4" />
            <Button
              type="submit"
              loadingText="loading.."
              loading={isPending}
              classname="w-full"
            >
              Login
            </Button>
            <p className="text-center mt-2 dark:text-slate-100">
              Not a member yet?{' '}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-700 hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
