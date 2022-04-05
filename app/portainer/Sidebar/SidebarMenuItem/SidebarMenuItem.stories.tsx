import { Meta, Story } from '@storybook/react';

import { SidebarMenuItem } from './SidebarMenuItem';

const meta: Meta = {
  title: 'Components/SidebarMenuItem',
  component: SidebarMenuItem,
};
export default meta;

interface StoryProps {
  iconClass?: string;
  className: string;
  label: string;
}

function Template({ iconClass, className, label: linkName }: StoryProps) {
  return (
    <ul className="sidebar">
      <SidebarMenuItem
        path="example.path"
        pathParams={{ endpointId: 1 }}
        iconClass={iconClass}
        className={className}
      >
        {linkName}
      </SidebarMenuItem>
    </ul>
  );
}

export const Primary: Story<StoryProps> = Template.bind({});
Primary.args = {
  iconClass: 'fa-tachometer-alt fa-fw',
  className: 'exampleItemClass',
  label: 'Item with icon',
};

export const WithoutIcon: Story<StoryProps> = Template.bind({});
WithoutIcon.args = {
  className: 'exampleItemClass',
  label: 'Item without icon',
};
