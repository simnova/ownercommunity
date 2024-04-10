import { Frame, useEditor } from '@craftjs/core';
import React, { useEffect, useState } from 'react';

export interface IProps {
  layout: string;
}

export const CmsPageFrame: React.FC<IProps> = (props) => {
    const { actions } = useEditor();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      actions.setOptions((options) => (options.enabled = false)); // disable editor for public viewing - this is a hack 
      setLoading(false);
      ///- https://github.com/prevwong/craft.js/issues/181
      //https://github.com/prevwong/craft.js/issues/404
      //https://github.com/prevwong/craft.js/issues/373
    },[actions,setLoading]);
    
    return (<>
      {loading ? <div>Loading...</div> : <Frame data={props.layout}  />}
    </>

      
    )
}