import { Meta, Story } from '@storybook/react';
import clsx from 'clsx';
import { useMemo } from 'react';

import { Environment, EnvironmentType } from '@/portainer/environments/types';
import { UserContext } from '@/portainer/hooks/useUser';
import { Role, User } from '@/portainer/users/types';

import { Sidebar } from './Sidebar';
import { useSidebarState } from './useSidebarState';

export default {
  component: Sidebar,
  title: 'Components/Sidebar',
} as Meta;

interface Args {
  environmentType: EnvironmentType;
  isAdmin: boolean;
}

function Template({ environmentType, isAdmin }: Args) {
  const { isOpen } = useSidebarState();
  const environment: Partial<Environment> = {
    Type: environmentType,
    Id: 1,
    Name: 'test',
  };

  const userState = useMemo<{ jwt: string; user: User }>(
    () => ({
      jwt: '',
      user: {
        Id: 1,
        Role: isAdmin ? Role.Admin : Role.Standard,
        Username: 'user',
        EndpointAuthorizations: {},
      },
    }),
    [isAdmin]
  );

  return (
    <div id="page-wrapper" className={clsx({ open: isOpen })}>
      <UserContext.Provider value={userState}>
        <Sidebar environment={environment as Environment} />
      </UserContext.Provider>
    </div>
  );
}

export const Example: Story<Args> = Template.bind({});
Example.args = {
  environmentType: EnvironmentType.AgentOnDocker,
  isAdmin: true,
};
