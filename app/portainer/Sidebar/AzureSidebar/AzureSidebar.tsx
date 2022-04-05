import { SidebarMenuItem } from '@/portainer/Sidebar/SidebarMenuItem';
import { EnvironmentId } from '@/portainer/environments/types';

interface Props {
  environmentId: EnvironmentId;
}

export function AzureSidebar({ environmentId }: Props) {
  return (
    <nav aria-label="Azure">
      <SidebarMenuItem
        path="azure.dashboard"
        pathParams={{ endpointId: environmentId }}
        iconClass="fa-tachometer-alt fa-fw"
      >
        Dashboard
      </SidebarMenuItem>
      <SidebarMenuItem
        path="azure.containerinstances"
        pathParams={{ endpointId: environmentId }}
        iconClass="fa-cubes fa-fw"
      >
        Container instances
      </SidebarMenuItem>
    </nav>
  );
}
