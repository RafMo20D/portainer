import { SidebarItem } from '@/portainer/Sidebar/SidebarItem';
import { EnvironmentId } from '@/portainer/environments/types';

interface Props {
  environmentId: EnvironmentId;
}

export function AzureSidebar({ environmentId }: Props) {
  return (
    <nav aria-label="Azure">
      <SidebarItem
        to="azure.dashboard"
        params={{ endpointId: environmentId }}
        iconClass="fa-tachometer-alt fa-fw"
        label="Dashboard"
      />
      <SidebarItem
        to="azure.containerinstances"
        params={{ endpointId: environmentId }}
        iconClass="fa-cubes fa-fw"
        label="Container instances"
      />
    </nav>
  );
}
