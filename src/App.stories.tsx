import React from "react";
import App from "./App";
import { Meta } from "@storybook/react/types-6-0";

export default {
    title: 'Documentation/Core/Typography/Body',
  } as Meta;

const Template = (args:any) => <App {...args} />;


export const Default = Template.bind({});
