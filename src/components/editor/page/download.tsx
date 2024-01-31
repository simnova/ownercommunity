import { useEditor } from '@craftjs/core';
import { Button, notification } from 'antd';
import { arePageLayoutsLoaded, usePageLayouts } from '../local-data';

export const Download = () => {
  const [pageLayouts] = usePageLayouts();
  const { query } = useEditor();

  if(!arePageLayoutsLoaded(pageLayouts)){
    return null; //JSON.stringify(pageLayouts);
  }

  const download = () => {
    const json = query.serialize();
    //copy(JSON.stringify(json));
    navigator.clipboard.writeText(JSON.stringify(json));
    notification.success({
      message: "Copied to Clipboard",
      description: "The JSON has been copied to your clipboard"
    });
  }

  const downloadAll = () => {
    //copy(JSON.stringify(pageLayouts));
    navigator.clipboard.writeText(JSON.stringify(pageLayouts));
    notification.success({
      message: "Copied to Clipboard",
      description: "The JSON has been copied to your clipboard"
    });
  }

  return (
    <div style={{display:'flex'}}>
      <Button data-testid="get-json" onClick={() => download()}>Get JSON</Button>
      <Button data-testid="get-site-json" onClick={() => downloadAll()}>Get Site JSON</Button>
    </div>
  )
}