import { useEditor } from "@craftjs/core";
import copy from "copy-to-clipboard";
import { notification } from "antd";


export const Download = () => {
  const { query } = useEditor();

  const download = () => {
    const json = query.serialize();
    copy(JSON.stringify(json));
    notification.success({
      message: "Copied to Clipboard",
      description: "The JSON has been copied to your clipboard"
    });
  }

  return (
    <div>
      <a onClick={() => download()}>Get JSON</a>
    </div>
  )
}