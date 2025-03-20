import { createContext, ReactNode, useContext, useState } from 'react';

type Props = {
  children: ReactNode;
};
type Context = {
  collapsed: boolean;
  toggleCollapsed: () => void;
  showSmallSidebar: boolean;
  toggleSmallSidebar: () => void;
};

const context = createContext<Context | undefined>(undefined);

export function PostLayoutProvider({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [showSmallSidebar, setshowSmallSidebar] = useState(false);
  function toggleCollapsed() {
    setCollapsed(!collapsed);
  }
  function toggleSmallSidebar() {
    setshowSmallSidebar(!showSmallSidebar);
  }
  return (
    <context.Provider
      value={{
        collapsed,
        showSmallSidebar,
        toggleCollapsed,
        toggleSmallSidebar,
      }}
    >
      {children}
    </context.Provider>
  );
}

export const usePostLayoutContext = () => {
  const postLayoutContext = useContext(context);
  if (!postLayoutContext) {
    throw new Error(
      'usePostLayoutContext must be used within PostLayout Component'
    );
  }
  return postLayoutContext;
};
