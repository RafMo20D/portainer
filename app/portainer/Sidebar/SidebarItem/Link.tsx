import { UISrefActive } from '@uirouter/react';
import { Children, ComponentProps, ReactNode } from 'react';
import _ from 'lodash';

import { Link } from '@/portainer/components/Link';

import styles from './Link.module.css';

interface Props extends ComponentProps<typeof Link> {
  children: ReactNode;
}

export function SidebarLink({ children, to, options, params, title }: Props) {
  const label = title || getLabel(children);

  return (
    <UISrefActive class={styles.active}>
      <Link
        to={to}
        params={params}
        className={styles.link}
        title={label}
        options={options}
      >
        {children}
      </Link>
    </UISrefActive>
  );
}

function getLabel(children: ReactNode) {
  return _.first(
    _.compact(
      Children.map(children, (child) => {
        if (typeof child === 'string') {
          return child;
        }

        return '';
      })
    )
  );
}
