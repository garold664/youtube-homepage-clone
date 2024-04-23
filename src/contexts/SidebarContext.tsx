import { createContext, useContext, useEffect, useState } from 'react';

type SidebarProviderProps = {
  children: React.ReactNode;
};

type SideBarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SideBarContext = createContext<SideBarContextType | null>(null);

export function useSidebarContext() {
  const value = useContext(SideBarContext);
  if (value == null) throw Error('Cannot use outside of SitebarProvider');
  return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    };

    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }
  function toggle() {
    if (isScreenSmall()) {
      setIsSmallOpen((state) => !state);
    } else {
      setIsLargeOpen((state) => !state);
    }
    console.log(isLargeOpen);
  }
  function close() {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  }
  return (
    <SideBarContext.Provider
      value={{ isLargeOpen, isSmallOpen, toggle, close }}
    >
      {children}
    </SideBarContext.Provider>
  );
}
