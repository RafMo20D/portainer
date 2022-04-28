import { AzureSidebar } from '@/portainer/Sidebar/AzureSidebar';
import { DockerSidebar } from '@/portainer/Sidebar/DockerSidebar';
import { KubernetesSidebar } from '@/portainer/Sidebar/KubernetesSidebar';
import { Environment, PlatformType } from '@/portainer/environments/types';
import { getPlatformType } from '@/portainer/environments/utils';

import { SidebarSection } from './SidebarSection';
import styles from './EnvironmentSidebar.module.css';

interface Props {
  environment: Environment;
}

export function EnvironmentSidebar({ environment }: Props) {
  const platform = getPlatformType(environment.Type);
  const sidebar = getSidebar();

  return (
    <SidebarSection
      title={
        <div className={styles.title}>
          <i className="fa fa-plug space-right" />
          {environment.Name}
        </div>
      }
      label={PlatformType[platform]}
    >
      {sidebar}
    </SidebarSection>
  );

  function getSidebar() {
    switch (platform) {
      case PlatformType.Azure:
        return <AzureSidebar environmentId={environment.Id} />;
      case PlatformType.Docker:
        return (
          <DockerSidebar
            environmentId={environment.Id}
            environment={environment}
          />
        );
      case PlatformType.Kubernetes:
        return <KubernetesSidebar environmentId={environment.Id} />;
      default:
        return null;
    }
  }
}
