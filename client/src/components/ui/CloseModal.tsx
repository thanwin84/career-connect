import { ReactNode } from "react";
import { RxCross2 } from "react-icons/rx";

type Props = {
  children: ReactNode;
  handleOpenModal: () => void;
};

export default function CloseModal({ children, handleOpenModal }: Props) {
  return (
    <div className="w-full">
      <span className="pb-6 flex justify-end">
        <button onClick={handleOpenModal}>
          <RxCross2 className="text-2xl hover:text-red-500 text-slate-800 dark:text-slate-200 dark:hover:text-red-600" />
        </button>
      </span>
      {children}
    </div>
  );
}
