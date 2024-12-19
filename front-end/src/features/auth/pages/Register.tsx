import { useState } from 'react';
import {
  ProgressSteps,
  CreateAccount,
  DescribeYourself,
  AddProfilePhoto,
} from '../components/register';
import useMultiStep from '../../../hooks/useMultiStep';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../store/userStore';
import { RegisterFormType } from '../validations';

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

  return (
    <main className="w-full bg-slate-50 dark:bg-zinc-900 ">
      <div className="lg:w-4/6 w-5/6  mx-auto">
        <ProgressSteps
          className=" mx-auto pt-6"
          totalSteps={steps.length}
          currentStep={currentStep}
          stepTitles={titles}
        />
        <div className="mx-auto pb-6">{step}</div>
      </div>
    </main>
  );
}
