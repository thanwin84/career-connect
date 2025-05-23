import TransitionPage from '@/components/ui/TransitionPage';
import useMultiStep from '@/hooks/useMultiStep';
import { Link } from 'react-router-dom';

import {
  AddProfilePhotoForm,
  BasicInformationForm,
  ProgressSteps,
  RoleForm,
} from '../components/register';
import { RegisterProvider } from '@/provider';

const titles = ['Create Account', 'Describe yourself', 'Add Profile Photo'];
export default function Register() {
  const { step, steps, currentStep, next, back } = useMultiStep([
    <BasicInformationForm next={() => next()} />,
    <RoleForm next={() => next()} goBack={() => back()} />,
    <AddProfilePhotoForm goBack={() => back()} />,
  ]);

  return (
    <RegisterProvider>
      <main className='bg-gray-100 dark:bg-zinc-900  min-h-screen py-6'>
        <TransitionPage>
          <div className='w-[90%] bg-white dark:bg-zinc-800 md:w-[45%] mx-auto px-6 rounded-md shadow-md'>
            <ProgressSteps
              className=' mx-auto pt-6'
              totalSteps={steps.length}
              currentStep={currentStep}
              stepTitles={titles}
            />
            <div className='mx-auto pb-4'>{step}</div>
            <p className='pb-6 text-center text-slate-800 dark:text-slate-300'>
              Are you already registered?{' '}
              <Link className='text-blue-400 hover:text-blue-500' to={'/login'}>
                Login
              </Link>
            </p>
          </div>
        </TransitionPage>
      </main>
    </RegisterProvider>
  );
}
