import { motion } from 'motion/react';
import { IoMdArrowRoundBack } from 'react-icons/io';

type Props = {
  className?: string;
  onClick: () => void;
};

export default function BackButton({ className, onClick }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.3, color: '#2563eb' }} // hover effect: scale + blue text
      // whileTap={{ scale: 0.95 }} // tap effect: slight shrink
      transition={{ stiffness: 200 }}
      onClick={onClick}
      className={`text-2xl ml-2 text-gray-800 dark:text-slate-200 ${className}`}
    >
      <IoMdArrowRoundBack />
    </motion.button>
  );
}
