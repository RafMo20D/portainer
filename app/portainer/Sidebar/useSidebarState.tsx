import { createContext, useContext, useEffect, useState } from 'react';
import angular, { IScope } from 'angular';

import * as storage from '@/portainer/hooks/useLocalStorage';

const mobileWidth = 992;
const storageKey = 'toolbar_toggle';

interface State {
  isOpen: boolean;
  toggle?(): void;
}

const Context = createContext<State | null>(null);

export function useSidebarState() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }

  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const state = useSidebarStateLocal();

  return <Context.Provider value={state}> {children} </Context.Provider>;
}

/* @ngInject */
export function AngularSidebarService($rootScope: IScope) {
  const state = {
    isOpen: false,
  };

  function isSidebarOpen() {
    return state.isOpen;
  }

  function setIsOpen(isOpen: boolean) {
    $rootScope.$evalAsync(() => {
      state.isOpen = isOpen;
    });
  }

  return { isSidebarOpen, setIsOpen };
}

function useSidebarStateLocal() {
  const [isMobile, setIsMobile] = useState(false);
  const [storageIsOpen, setIsOpenInStorage] = storage.useLocalStorage(
    storageKey,
    true
  );
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    let isOpen = isMobile ? false : storageIsOpen;
    if (window.ddExtension) {
      isOpen = false;
    }

    setIsOpen(isOpen);

    // to sync "outside state" - for angularjs
    const $injector = angular.element(document).injector();
    $injector.invoke(
      /* @ngInject */ (
        SidebarService: ReturnType<typeof AngularSidebarService>
      ) => {
        SidebarService.setIsOpen(isOpen);
      }
    );
  }, [storageIsOpen, isMobile]);

  function toggle(value = !storageIsOpen) {
    setIsOpenInStorage(value);
  }

  useEffect(() => {
    if (window.ddExtension) {
      return undefined;
    }

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  function onResize() {
    const width = window.innerWidth;
    setIsMobile(width < mobileWidth);
  }

  return {
    isOpen,
    toggle: !isMobile ? toggle : undefined,
  };
}
