import { useState } from 'react';
import {
  ProgressSteps,
  CreateAccount,
  DescribeYourself,
  AddProfilePhoto,
} from '../components/register';
import useMultiStep from '../../../hooks/useMultiStep';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../lib/store/userStore';
import { LoadingPage } from '../../../components/ui';
import { RegisterFormType } from '../../../lib/schemas/registerSchema';
import TransitionPage from '../../../components/ui/TransitionPage';

type Props = {
  className?: string;
};

export default function Register({}: Props) {
  const [user, setUser] = useState<Partial<RegisterFormType>>({});
  const navigate = useNavigate();
  const userStore = useUserStore();
  if (userStore.user) {
    navigate('/');
  }
  function updateUser(values: Partial<RegisterFormType>) {
    setUser((prev) => ({ ...prev, ...values }));
  }

  const { step, steps, currentStep, next, back } = useMultiStep([
    <CreateAccount next={() => next()} setUser={updateUser} user={user} />,
    <DescribeYourself
      next={() => next()}
      goBack={() => back()}
      setUser={updateUser}
    />,
    <AddProfilePhoto goBack={() => back()} user={user} />,
  ]);

  const titles = ['Create Account', 'Describe yourself', 'Add Profile Photo'];

  if (userStore.isLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="bg-gray-100 dark:bg-zinc-900  min-h-screen py-6">
      <TransitionPage>
        <div className="w-[90%] bg-white dark:bg-zinc-800 md:w-[45%] mx-auto px-6 rounded-md shadow-md">
          <ProgressSteps
            className=" mx-auto pt-6"
            totalSteps={steps.length}
            currentStep={currentStep}
            stepTitles={titles}
          />
          <div className="mx-auto pb-4">{step}</div>
          <p className="pb-6 text-center text-slate-800 dark:text-slate-300">
            Are you already registered?{' '}
            <Link className="text-blue-400 hover:text-blue-500" to={'/login'}>
              Login
            </Link>
          </p>
        </div>
      </TransitionPage>
    </main>
  );
}
