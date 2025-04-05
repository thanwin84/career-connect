import { createContext, ReactNode, useContext, useState } from 'react';
import { motion } from 'motion/react';

type Props = {
  className?: string;
  children: ReactNode;
};

type ContextType = {
  showBigSidebar: boolean;
  showSmallSidebar: boolean;
  isOpen: boolean;
  toggleOpen: () => void;
  toggleCollapse: () => void;
  isCollapsed: Boolean;
};
const sidebarContext = createContext<ContextType | undefined>(undefined);

export default function Sheet({ className, children }: Props) {
  const [showBigSidebar, setShowBigSidebar] = useState(true);
  const [showSmallSidebar, setShowSmallSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleCollapse() {
    setIsCollapsed(!isCollapsed);
    setShowBigSidebar(!showBigSidebar);
  }

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
    setShowBigSidebar((prev) => !prev);
    setShowSmallSidebar((prev) => !prev);
  };
  return (
    <sidebarContext.Provider
      value={{
        toggleOpen,
        showBigSidebar,
        showSmallSidebar,
        isOpen,
        toggleCollapse,
        isCollapsed,
      }}
    >
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100 }}
        transition={{ duration: 0.3 }}
        className={`relative flex ${className}`}
      >
        {children}
      </motion.div>
    </sidebarContext.Provider>
  );
}

export const useSheetContext = () => {
  const context = useContext(sidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};
