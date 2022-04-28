import { useCurrentStateAndParams } from '@uirouter/react';
import clsx from 'clsx';
import {
  Children,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useMemo,
  useReducer,
} from 'react';

import { useSidebarState } from '../useSidebarState';

import styles from './Menu.module.css';
import { Link } from './Link';

interface Props {
  head: ReactNode;
}

export function Menu({ children, head }: PropsWithChildren<Props>) {
  const { isOpen: isSidebarOpen } = useSidebarState();
  const paths = useMemo(() => getPathsForChildren(children), [children]);

  const { isOpen, toggleOpen } = useIsOpen(isSidebarOpen, paths);

  return (
    <>
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
        {head}
      </div>

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

  paths: string[] = []
) {
  const { state } = useCurrentStateAndParams();
  const currentStateName = state.name || '';
  const isOpenByState = paths.some((path) => currentStateName.startsWith(path));

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

function isReactElement(element: ReactNode): element is ReactElement {
  return (
    !!element &&
    typeof element === 'object' &&
    'type' in element &&
    'props' in element
  );
}

function getPathsForChildren(children: ReactNode): string[] {
  return Children.map(children, (child) => getPaths(child, []))?.flat() || [];
}

function getPaths(element: ReactNode, paths: string[]): string[] {
  if (!isReactElement(element)) {
    return paths;
  }

  if (element.type !== Link) {
    return Children.map(element.props.children, (child) =>
      getPaths(child, paths)
    );
  }

  return [element.props.to, ...paths];
}
