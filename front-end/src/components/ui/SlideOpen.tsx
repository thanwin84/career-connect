import { ReactNode, useEffect } from 'react';

type Position = 'right' | 'left' | 'bottom';
type Props = {
  className?: string;
  isOpen: boolean;
  closeFn: () => void;
  children: ReactNode;
  position?: Position;
};
export default function SlideOpen({
  className = '',
  isOpen,
  closeFn,
  children,
  position = 'right',
}: Props) {
  const positions: Record<Position, string> = {
    right: `top-0 right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`,
    left: `top-0 left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`,
    bottom: `bottom-0 left-0 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`,
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeFn}
        ></div>
      )}
      <div
        className={`w-4/6 lg:w-3/6  fixed h-screen bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${positions[position]} z-50 ${className}`}
      >
        {children}
      </div>
    </>
  );
}
