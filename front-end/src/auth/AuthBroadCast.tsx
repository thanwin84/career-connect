import { useEffect } from 'react';

type Props = {
  className?: string;
};

export default function AuthBroadcast({}: Props) {
  useEffect(() => {
    const broadcast = new BroadcastChannel('auth');
    broadcast.onmessage = (event: MessageEvent) => {
      if (event.data == 'logout') {
        window.location.href = '/login';
      }
    };
    return () => broadcast.close();
  }, []);
  return null;
}
