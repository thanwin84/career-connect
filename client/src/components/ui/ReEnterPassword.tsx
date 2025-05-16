import { ReEnterPasswordForm } from '.';

type Props = {
  className?: string;
  action: () => void;
};

export default function ReEnterPassword({ action }: Props) {
  return (
    <ReEnterPasswordForm
      action={action}
      title='Re-enter your passwords'
      description='Please enter your password to turn on two step authentication'
      isPending={false}
    />
  );
}
