import { ReactNode, useEffect } from "react";
type Props = {
  className?: string;
  children: ReactNode;
  isOpen: boolean;
  titleId?: string;
};

export default function Modal({
  className,
  children,
  isOpen,
  titleId = "id",
}: Props) {
  useEffect(() => {
    // Disable scrolling on the background when the modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-labelledby={titleId}
      className={`z-20 overflow-y-scroll bg-black fixed inset-0 bg-opacity-40 flex items-center justify-center  transition-opacity   duration-300 ease-out ${
        isOpen ? "opacity-100  visible" : "opacity-0 invisible"
      }  ${className}`}
    >
      <div
        className={`w-full max-h-screen transition-transform duration-300 ease-out  ${
          isOpen ? "scale-100" : "scale-75"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
