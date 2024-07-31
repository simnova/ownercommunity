import React, { useEffect } from 'react';
import { Editor, Frame, useEditor } from '@craftjs/core';
import * as CmsComponents from '../../../../../../../../editor/components';

interface EditorSerializerProps {
  component: JSX.Element | undefined;
  serializedData: any;
  onSerialize: (data: string) => void;
}
const EditorSerializer: React.FC<EditorSerializerProps> = (props) => {
  const { query, actions } = useEditor();

  const serialize = () => {
    const serializedString = query.serialize();
    if (props.onSerialize) {
      props.onSerialize(serializedString);
    }
  };

  const deserialize = (data: any) => {
    try {
      actions.deserialize(data);
    } catch (error) {
      console.error('Error during deserialization:', error);
    }
  };

  useEffect(() => {
    if (props.serializedData) {
      deserialize(props.serializedData);
    } else if (props.component) {
      serialize();
    }
  }, [props.serializedData]);

  return (
    // <Editor resolver={{ ...CmsComponents }}>
    <>
          {props.component ? props.component : <></>}
    </>
    // </Editor>
  );
};

export default EditorSerializer