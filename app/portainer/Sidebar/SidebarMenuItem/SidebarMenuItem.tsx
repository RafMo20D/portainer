import { PropsWithChildren, AriaAttributes } from 'react';
import clsx from 'clsx';
import { UISrefActive } from '@uirouter/react';

import { Link } from '@/portainer/components/Link';

import styles from './SidebarMenuItem.module.css';

interface WrapperProps {
  className?: string;
  ident?: boolean;
  title?: string;
}

interface Props {
  path: string;
  pathParams?: Record<string, unknown>;
  iconClass?: string;
  className?: string;
  ident?: boolean;
  label?: string;
}

export function SidebarMenuItemWrapper({
  ident,
  className,
  children,
  ...props
}: PropsWithChildren<WrapperProps> & AriaAttributes) {
  return (
    <li
      className={clsx(styles.sidebarMenuItem, className, {
        [styles.ident]: ident,
      })}
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
  ident = false,
  label,
  ...ariaProps
}: PropsWithChildren<Props> & AriaAttributes) {
  const itemLabel =
    label || (typeof children === 'string' ? children : undefined);
  return (
    <SidebarMenuItemWrapper
      className={className}
      ident={ident}
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
