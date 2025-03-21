import { Button } from '../components/ui';
import { appConfig } from '../config/appConfig';
import { useTimer } from '../hooks/useTimer';
import { formatTimer } from '../utils';

type Props = {
  className?: string;
};

export default function EmailConfirmation({}: Props) {
  const { seconds, minutes } = useTimer(
    appConfig.EMAIL_VERIFICATION_EXPIRY_TIME
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Check Your Email for Verification
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We’ve sent a verification link to your email. Please check your
            inbox and follow the instructions.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {minutes === 0 && seconds === 0 ? (
            <Button classname="w-full">Resend Verification Email</Button>
          ) : (
            <span className="w-full block py-2 bg-gray-400 text-slate-100 rounded-md text-center">
              Verification expires in {formatTimer(minutes)} :{' '}
              {formatTimer(seconds)}
            </span>
          )}

          <div className="text-center text-sm text-gray-500">
            <p>
              Didn't receive the email?{' '}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Check your spam folder
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
