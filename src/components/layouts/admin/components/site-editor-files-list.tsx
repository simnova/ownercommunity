import React, { useState } from 'react';
import { Table, TableColumnsType, Row, message, Button } from 'antd';
import { FileInfo } from '../../../../generated';
import ResizeObserver from 'rc-resize-observer';
import './site-editor-files-list.css';

export interface SiteEditorFilesListProps {
  data: FileInfo[];
  onRemove: (fileName: string) => void;
}

export const SiteEditorFilesList: React.FC<SiteEditorFilesListProps> = (props) => {
  const [tableHeight, setTableHeight] = useState(0);
  //const scroll = true;
  
  const columns:TableColumnsType<FileInfo> = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "url",
      dataIndex: "url",
      key: "url",
    },
  ]

  return (<>
    <div style={{minHeight:'100%', display:'flex', flexDirection:'column'}}>
      <ResizeObserver onResize={({ height }) => { setTableHeight(height); console.log('setHeight',height) }} >
      <div className={'file-table'} style={{flex:'1 0 auto'}}>
        <Table 
          style={{ width: "100%",  height: `${tableHeight-15}px` }}
          columns={columns} 
          dataSource={props.data}
          rowKey={(record: FileInfo) => record.name}
          scroll={{ y: `${tableHeight-90}px`, x: '100%' }}
          size="small"
         // sticky={true}
        />
      </div>
      </ResizeObserver>
      
    </div>
  </>)

}