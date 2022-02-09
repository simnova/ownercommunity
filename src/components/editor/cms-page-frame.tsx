import React from "react";
import {  Frame, useEditor } from '@craftjs/core';

export interface IProps {
  layout: string;
}

const CmsPageFrame: React.FC<IProps> = ({layout, ...props}) => {
  
    const { actions } = useEditor();
    actions.setOptions((options) => (options.enabled = false));
    
    return <>
      <Frame data={layout}>
      </Frame>
    </>
}
export {CmsPageFrame};