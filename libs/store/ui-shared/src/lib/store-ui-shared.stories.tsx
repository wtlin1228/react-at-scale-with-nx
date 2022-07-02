import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreUiShared } from './store-ui-shared';

export default {
  component: StoreUiShared,
  title: 'StoreUiShared',
} as ComponentMeta<typeof StoreUiShared>;

const Template: ComponentStory<typeof StoreUiShared> = (args) => (
  <StoreUiShared {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
