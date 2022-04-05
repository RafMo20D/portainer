import { render } from '@/react-tools/test-utils';

import { SidebarMenuItem } from './SidebarMenuItem';

test('should be visible & have expected class', () => {
  const { getByRole, getByText } = renderComponent('Test', 'testClass');
  const listItem = getByRole('listitem');
  expect(listItem).toBeVisible();
  expect(listItem).toHaveClass('testClass');
  expect(getByText('Test')).toBeVisible();
});

test('icon should with correct icon if iconClass is provided', () => {
  const { getByLabelText } = renderComponent('', '', 'testIconClass');
  const sidebarIcon = getByLabelText('itemIcon');
  expect(sidebarIcon).toBeVisible();
  expect(sidebarIcon).toHaveClass('testIconClass');
});

test('icon should not be rendered if iconClass is not provided', () => {
  const { queryByRole } = renderComponent();
  expect(queryByRole('img')).not.toBeInTheDocument();
});

function renderComponent(label = '', className = '', iconClass = '') {
  return render(
    <SidebarMenuItem
      path=""
      pathParams={{ endpointId: 1 }}
      iconClass={iconClass}
      className={className}
    >
      {label}
    </SidebarMenuItem>
  );
}
