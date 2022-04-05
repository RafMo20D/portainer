import { PropsWithChildren, ReactNode } from 'react';

import styles from './SidebarSection.module.css';

interface Props {
  title: ReactNode;
}

export function SidebarSection({ title, children }: PropsWithChildren<Props>) {
  return (
    <>
      <li className={styles.sidebarTitle}>
        <span>{title}</span>
      </li>

      {children}
    </>
  );
}
