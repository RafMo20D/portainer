import { Terminal } from 'xterm';
import { fit } from 'xterm/lib/addons/fit/fit';
import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { Button } from '@/portainer/components/Button';
import { baseHref } from '@/portainer/helpers/pathHelper';
import {
  terminalClose,
  terminalResize,
} from '@/portainer/services/terminal-window';
import { EnvironmentId } from '@/portainer/environments/types';
import { error as notifyError } from '@/portainer/services/notifications';
import { useLocalStorage } from '@/portainer/hooks/useLocalStorage';

import styles from './KubectlShell.module.css';

interface ShellState {
  socket: WebSocket | null;
  terminal: Terminal | null;
  minimized: boolean;
}

interface Props {
  environmentId: EnvironmentId;
  onClose(): void;
}

export function KubeCtlShell({ environmentId, onClose }: Props) {
  const [shell, setShell] = useState<ShellState>({
    socket: null,
    terminal: null,
    minimized: false,
  });
  const terminalElem = useRef(null);

  const [jwt] = useLocalStorage('JWT', '');

  const handleUnload = useCallback(() => '', []);

  const handleDisconnect = useCallback(() => {
    terminalClose();
    shell.socket?.close();
    shell.terminal?.dispose();
    window.removeEventListener('resize', terminalResize);
    onClose();
  }, [shell.socket, shell.terminal, onClose]);

  const handleConnect = useCallback(() => {
    if (!terminalElem.current) {
      throw new Error('missing terminal element');
    }

    terminalResize();

    const params = {
      token: jwt,
      endpointId: environmentId,
    };

    const wsProtocol =
      window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const path = `${baseHref()}api/websocket/kubernetes-shell`;
    const base = path.startsWith('http')
      ? path.replace(/^https?:\/\//i, '')
      : window.location.host + path;

    const queryParams = Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join('&');
    const url = `${wsProtocol}${base}?${queryParams}`;

    const socket = new WebSocket(url);
    const terminal = new Terminal();

    socket.addEventListener('open', () => {
      if (!terminalElem.current) {
        return;
      }

      terminal.open(terminalElem.current);
      terminal.setOption('cursorBlink', true);
      terminal.focus();
      fit(terminal);
      terminal.writeln('#Run kubectl commands inside here');
      terminal.writeln('#e.g. kubectl get all');
      terminal.writeln('');
    });

    socket.addEventListener('message', (event) => {
      terminal.write(event.data);
    });

    terminal.onData((data) => {
      socket.send(data);
    });

    socket.addEventListener('close', () => {
      handleDisconnect();
    });

    socket.addEventListener('error', (event) => {
      handleDisconnect();
      if (socket.readyState !== WebSocket.CLOSED) {
        notifyError(
          'Failure',
          event as unknown as Error,
          'Websocket connection error'
        );
      }
    });

    window.addEventListener('resize', terminalResize);

    setShell({ socket, terminal, minimized: false });
  }, [handleDisconnect, environmentId, jwt]);

  useEffect(() => {
    handleConnect();
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      handleDisconnect();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [handleConnect, handleDisconnect, handleUnload]);

  return (
    <div className={clsx(styles.root, { [styles.minimized]: shell.minimized })}>
      <div className={styles.header}>
        <div className={styles.title}>
          <i className="fas fa-terminal space-right" />
          kubectl shell
        </div>
        <div className={clsx(styles.actions, 'space-x-8')}>
          <Button color="link" onClick={clearScreen}>
            <i className="fas fa-redo-alt" data-cy="k8sShell-refreshButton" />
          </Button>
          <Button color="link" onClick={toggleMinimize}>
            <i
              className={clsx(
                'fas',
                shell.minimized ? 'fa-window-restore' : 'fa-window-minimize'
              )}
              data-cy={
                shell.minimized ? 'k8sShell-restore' : 'k8sShell-minimise'
              }
            />
          </Button>
          <Button color="link" onClick={handleDisconnect}>
            <i className="fas fa-times" data-cy="k8sShell-closeButton" />
          </Button>
        </div>
      </div>

      <div className={styles.terminalContainer} ref={terminalElem}>
        <div className={styles.loadingMessage}>Loading Terminal...</div>
      </div>
    </div>
  );

  function clearScreen() {
    shell.terminal?.clear();
  }

  function toggleMinimize() {
    if (shell.minimized) {
      terminalResize();
      setShell((shell) => ({ ...shell, minimized: false }));
    } else {
      terminalClose();
      setShell((shell) => ({ ...shell, minimized: true }));
    }
  }
}
