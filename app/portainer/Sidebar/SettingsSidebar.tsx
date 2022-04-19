import { SidebarMenu } from './SidebarMenu';
import { SidebarMenuItem } from './SidebarMenuItem';
import { SidebarSection } from './SidebarSection';
import { SidebarMenuItemWrapper } from './SidebarMenuItem/SidebarMenuItem';

interface Props {
  isAdmin: boolean;
}

export function SettingsSidebar({ isAdmin }: Props) {
  return (
    <SidebarSection title="Settings">
      <nav aria-label="Settings">
        {!window.ddExtension && (
          <SidebarMenu
            iconClass="fa-users fa-fw"
            label="Users"
            path="portainer.users"
            childrenPaths={[
              'portainer.users.user',
              'portainer.teams',
              'portainer.teams.team',
              'portainer.roles',
              'portainer.roles.role',
              'portainer.roles.new',
            ]}
          >
            <SidebarMenuItem path="portainer.teams" ident>
              Teams
            </SidebarMenuItem>
            {isAdmin && (
              <SidebarMenuItem path="portainer.roles" ident>
                Roles
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        )}
        {isAdmin && (
          <>
            <SidebarMenu
              iconClass="fa-plug fa-fw"
              label="Environments"
              path="portainer.endpoints"
              childrenPaths={[
                'portainer.endpoints.endpoint',
                'portainer.endpoints.new',
                'portainer.endpoints.endpoint.access',
                'portainer.groups',
                'portainer.groups.group',
                'portainer.groups.group.access',
                'portainer.groups.new',
                'portainer.tags',
              ]}
            >
              <SidebarMenuItem path="portainer.groups" ident>
                Groups
              </SidebarMenuItem>
              <SidebarMenuItem path="portainer.tags" ident>
                Tags
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenuItem
              path="portainer.registries"
              iconClass="fa-database fa-fw"
            >
              Registries
            </SidebarMenuItem>
            <SidebarMenuItem
              path="portainer.licenses"
              iconClass="fa-file-signature fa-fw"
            >
              Licenses
            </SidebarMenuItem>
            <SidebarMenu
              label="Authentication logs"
              iconClass="fa-history fa-fw"
              path="portainer.authLogs"
              childrenPaths={['portainer.activityLogs']}
            >
              <SidebarMenuItem path="portainer.activityLogs" ident>
                Activity Logs
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu
              label="Settings"
              iconClass="fa-cogs fa-fw"
              path="portainer.settings"
              childrenPaths={[
                'portainer.settings.authentication',
                'portainer.settings.edgeCompute',
              ]}
            >
              {!window.ddExtension && (
                <SidebarMenuItem path="portainer.settings.authentication" ident>
                  Authentication
                </SidebarMenuItem>
              )}
              <SidebarMenuItem path="portainer.settings.edgeCompute" ident>
                Edge Compute
              </SidebarMenuItem>
              <SidebarMenuItemWrapper ident title="Help">
                <a
                  href={
                    process.env.PORTAINER_EDITION === 'CE'
                      ? 'https://www.portainer.io/community_help'
                      : 'https://documentation.portainer.io/r/business-support'
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Help / About
                </a>
              </SidebarMenuItemWrapper>
            </SidebarMenu>
          </>
        )}
      </nav>
    </SidebarSection>
  );
}
