import { Meta, StoryFn } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { MaintenanceKickoutMessage } from './maintenance-kickout-message';

export default {
  title: 'Components/Maintenance Kickout Message',
  component: MaintenanceKickoutMessage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
} as Meta<typeof MaintenanceKickoutMessage>;

const Template: StoryFn<typeof MaintenanceKickoutMessage> = (args) => (
  <MaintenanceKickoutMessage {...args} />
);

export const DefaultView = Template.bind({});

DefaultView.args = {
  timer: '2:00'
};