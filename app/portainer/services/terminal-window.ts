const terminalHeight = 495;

export function terminalClose() {
  update('100%', 'initial');
}

export function terminalResize() {
  const contentWrapperHeight = window.innerHeight;
  const newContentWrapperHeight = contentWrapperHeight - terminalHeight;
  update(`${newContentWrapperHeight}px`, 'auto');
}

function update(height: string, overflowY: string) {
  const contentWrapper = document.getElementById('content-wrapper');
  const sidebarWrapper = document.getElementById('sidebar-wrapper');

  if (contentWrapper) {
    contentWrapper.style.height = height;
    contentWrapper.style.overflowY = overflowY;
  }

  if (sidebarWrapper) {
    sidebarWrapper.style.height = height;
  }
}
