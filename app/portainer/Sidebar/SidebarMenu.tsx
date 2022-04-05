import { useCurrentStateAndParams } from '@uirouter/react';
import clsx from 'clsx';
import { Children, PropsWithChildren, useReducer } from 'react';

import { SidebarMenuItem } from './SidebarMenuItem';
import styles from './SidebarMenu.module.css';
import { useSidebarState } from './useSidebarState';

interface Props {
  path: string;
  pathParams?: Record<string, unknown>;
  iconClass?: string;
  label: string;
  childrenPaths?: string[];
}

export function SidebarMenu({
  path,
  pathParams,
  iconClass,
  label,
  childrenPaths = [],
  children,
}: PropsWithChildren<Props>) {
  const { isOpen: isSidebarOpen } = useSidebarState();
  const { isOpen, toggleOpen } = useIsOpen(isSidebarOpen, path, childrenPaths);

  return (
    <>
      <SidebarMenuItem
        path={path}
        pathParams={pathParams}
        iconClass={iconClass}
        label={label}
        className={styles.sidebarMenu}
      >
        <div className={styles.sidebarMenuHead}>
          {Children.count(children) > 0 && (
            <button
              className={clsx('small', styles.sidebarMenuIndicator)}
              onClick={handleClickArrow}
              type="button"
            >
              <i
                className={clsx(
                  'fas',
                  isOpen ? 'fa-chevron-down' : 'fa-chevron-right'
                )}
              />
            </button>
          )}
          {label}
        </div>
      </SidebarMenuItem>

      {isOpen && <ul className={styles.items}>{children}</ul>}
    </>
  );

  function handleClickArrow(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    toggleOpen();
  }
}

function useIsOpen(
  isSidebarOpen: boolean,
  path: string,
  childrenPaths: string[]
) {
  const { state } = useCurrentStateAndParams();
  const currentStateName = state.name || '';
  const isOpenByState =
    currentStateName.startsWith(path) ||
    childrenPaths.includes(currentStateName);

  const [forceOpen, toggleForceOpen] = useReducer((state) => !state, false);

  const isOpen = checkIfOpen();

  return { isOpen, toggleOpen };

  function toggleOpen() {
    if (!isOpenByState) {
      toggleForceOpen();
    }
  }

  function checkIfOpen() {
    if (!isSidebarOpen) {
      return false;
    }

    if (forceOpen) {
      return true;
    }

    return isOpenByState;
  }
}
