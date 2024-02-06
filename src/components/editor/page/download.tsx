import { useEditor } from '@craftjs/core';
import { Button, notification } from 'antd';
import { arePageLayoutsLoaded, usePageLayouts } from '../page-layout';

export const Download = () => {
  const [pageLayouts] = usePageLayouts();
  const { query } = useEditor();

  if(!arePageLayoutsLoaded(pageLayouts)){
    return null;
  }

  const download = () => {
    const json = query.serialize();
    navigator.clipboard.writeText(JSON.stringify(json));
    notification.success({
      message: "Copied to Clipboard",
      description: "The JSON has been copied to your clipboard"
    });
  }

  const downloadAll = () => {
    navigator.clipboard.writeText(JSON.stringify(pageLayouts));
    notification.success({
      message: "Copied to Clipboard",
      description: "The JSON has been copied to your clipboard"
    });
  }

  return (
    <div style={{display:'flex'}}>
      <Button data-testid="get-json" onClick={() => download()}>Get Page JSON</Button>
      <Button data-testid="get-site-json" onClick={() => downloadAll()}>Get Site JSON</Button>
    </div>
  )
}