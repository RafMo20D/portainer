import { Meta, Story } from '@storybook/react';
import { ComponentProps } from 'react';

import { FormSection } from './FormSection';

type Props = ComponentProps<typeof FormSection>;

export default {
  component: FormSection,
  title: 'Components/Form/FormSection',
} as Meta;

function Template({ children, title }: Props) {
  return <FormSection title={title}>{children}</FormSection>;
}

export const Example: Story<Props> = Template.bind({});
Example.args = {
  title: 'This is a title',
  children: 'section',
};
