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
    <main className="bg-gray-100 min-h-screen py-6">
      <div className="w-[90%] bg-white md:w-[45%] mx-auto px-6 rounded-md shadow-md">
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
