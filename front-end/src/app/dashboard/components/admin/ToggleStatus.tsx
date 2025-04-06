import { TurnOff, TurnOn } from '@/components/ui';
import { AnimatePresence, motion } from 'motion/react';

type Props = {
  accessStatus: boolean;
  onToggleClick: () => void;
};

export default function ToggleStatus({ accessStatus, onToggleClick }: Props) {
  return (
    <button
      type='submit'
      onClick={onToggleClick}
      aria-label={
        accessStatus ? 'Turn off access status' : 'Turn on access status'
      }
      className='relative w-12 h-6 rounded-full   focus:outline-none'
    >
      <AnimatePresence initial={false}>
        {accessStatus ? (
          <motion.div
            key='on'
            initial={{ x: -4, opacity: 0 }}
            animate={{ x: 4, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className='absolute top-0 left-0 w-6 h-6 bg-green-500 rounded-full'
          >
            <TurnOn />
          </motion.div>
        ) : (
          <motion.div
            key='off'
            initial={{ x: 4, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className='absolute top-0 left-0 w-6 h-6 bg-red-500 rounded-full'
          >
            <TurnOff />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
