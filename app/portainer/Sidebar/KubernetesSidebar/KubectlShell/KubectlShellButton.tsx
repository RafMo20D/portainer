import { useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/portainer/components/Button';
import { EnvironmentId } from '@/portainer/environments/types';

import { KubeCtlShell } from './KubectlShell';
import styles from './KubectlShellButton.module.css';

interface Props {
  environmentId: EnvironmentId;
}
export function KubectlShellButton({ environmentId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        color="primary"
        size="xsmall"
        disabled={open}
        data-cy="k8sSidebar-shellButton"
        onClick={() => setOpen(true)}
        className={styles.root}
        analytics-on
        analytics-category="kubernetes"
        analytics-event="kubernetes-kubectl-shell"
      >
        <i className="fa fa-terminal space-right" /> kubectl shell
      </Button>

      {open &&
        createPortal(
          <KubeCtlShell
            environmentId={environmentId}
            onClose={() => setOpen(false)}
          />,
          document.body
        )}
    </>
  );
}
