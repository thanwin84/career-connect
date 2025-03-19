import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useMutation } from '../hooks';
import { customFetch } from '../utils';
import { Button } from '../components/ui';

type Props = {
  className?: string;
};

export default function VerifyEmail({}: Props) {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    isError,
    isSuccess,
    isPending,
    mutate: verifyEmail,
  } = useMutation(
    async (token: string) =>
      await customFetch.patch('/verifications/verify-email', {
        token: token,
      })
  );

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);
  return (
    <section className="bg-black/85 h-screen flex justify-center items-center">
      <div>
        {isPending && (
          <p className="text-2xl font-semibold text-slate-200">
            Your email is being verified
          </p>
        )}
        {isSuccess && (
          <div className="flex gap-4 flex-col justify-center">
            <p className="font-semibold text-2xl text-green-400">
              ✅ Thank you, your email is veriied
            </p>
            <Link
              className="py-2 px-6 bg-slate-100 hover:bg-slate-200 rounded-md self-center"
              to={'/'}
            >
              Go to HomePage
            </Link>
          </div>
        )}
        {isError && (
          <div className="flex gap-4 flex-col justify-center">
            <p className="text-2xl  font-semibol dtext-center text-red-500">
              Invalid token or token is expired
            </p>
            <Link
              className="py-2 px-6 bg-slate-100 hover:bg-slate-200 rounded-md self-center"
              to={'/'}
            >
              Go to HomePage
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
