import { PropsWithChildren, AriaAttributes } from 'react';
import clsx from 'clsx';
import { UISrefActive } from '@uirouter/react';

import { Link } from '@/portainer/components/Link';

import styles from './SidebarMenuItem.module.css';

interface WrapperProps {
  className?: string;
  title?: string;
}

interface Props {
  path: string;
  pathParams?: Record<string, unknown>;
  iconClass?: string;
  className?: string;
  label?: string;
}

export function SidebarMenuItemWrapper({
  className,
  children,
  ...props
}: PropsWithChildren<WrapperProps> & AriaAttributes) {
  return (
    <li
      className={clsx(styles.sidebarMenuItem, className)}
      // disabling to pass aria and test props
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </li>
  );
}

export function SidebarMenuItem({
  path,
  pathParams,
  iconClass,
  className,
  children,
  label,
  ...ariaProps
}: PropsWithChildren<Props> & AriaAttributes) {
  const itemLabel =
    label || (typeof children === 'string' ? children : undefined);
  return (
    <SidebarMenuItemWrapper
      className={className}
      title={itemLabel}
      aria-label={itemLabel}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ariaProps}
    >
      <UISrefActive class={styles.active}>
        <Link
          to={path}
          params={pathParams}
          className={styles.link}
          title={itemLabel}
        >
          {children}
          {iconClass && (
            <i
              role="img"
              className={clsx('fa', iconClass, styles.menuIcon)}
              aria-label="itemIcon"
              aria-hidden="true"
            />
          )}
        </Link>
      </UISrefActive>
    </SidebarMenuItemWrapper>
  );
}
