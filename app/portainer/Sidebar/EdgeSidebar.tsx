import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarSection } from './SidebarSection';

export function EdgeSidebar() {
  return (
    <SidebarSection title="Edge compute">
      <nav aria-label="Edge">
        <SidebarMenuItem
          path="edge.devices"
          iconClass="fas fa-laptop-code fa-fw"
        >
          Edge Devices
        </SidebarMenuItem>
        <SidebarMenuItem path="edge.groups" iconClass="fa-object-group fa-fw">
          Edge Groups
        </SidebarMenuItem>
        <SidebarMenuItem path="edge.stacks" iconClass="fa-layer-group fa-fw">
          Edge Stacks
        </SidebarMenuItem>
        <SidebarMenuItem path="edge.jobs" iconClass="fa-clock fa-fw">
          Edge Jobs
        </SidebarMenuItem>
      </nav>
    </SidebarSection>
  );
}
