import React, { useState } from 'react';
import { Table, TableColumnsType, Row, message, Button, notification } from 'antd';
import { FileInfo } from '../../../../generated';
import ResizeObserver from 'rc-resize-observer';
import './site-editor-files-list.css';
import copy from "copy-to-clipboard";
import { LinkOutlined } from '@ant-design/icons';

export interface SiteEditorFilesListProps {
  data: FileInfo[];
  onRemove: (fileName: string) => void;
}

export const SiteEditorFilesList: React.FC<SiteEditorFilesListProps> = (props) => {
  const [tableHeight, setTableHeight] = useState(0);
  //const scroll = true;

  const bytesToSize = (bytes: number): string => {
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString())
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
  }

  const mimeTypeToFileType = (mimeType: string): string => {
    if (mimeType === 'text/plain') {
      return 'TEXT';
    } else if (mimeType.startsWith('image/') || mimeType.startsWith('application/') || mimeType.startsWith('text/')) {
      return mimeType.substring(mimeType.indexOf('/') + 1).toUpperCase();
    } else {
      return 'file';
    }
  }

  const copyUrl = (url:string) => {
    copy(url);
    notification.success({
      message: "Copied to Clipboard",
      description: "The link has been copied to your clipboard"
    });
  }
  
  const columns:TableColumnsType<FileInfo> = [
    {
      title: "File",
      dataIndex: "name",
      key: "name",
      render: (text: any) => text ? <span>{text.substring(text.indexOf('/')+1)}</span> : <span>n/a</span>
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (text: any) => text ? <span>{bytesToSize(text)}</span> : <span>n/a</span>
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: any) => text ? <span>{mimeTypeToFileType(text)}</span> : <span>n/a</span>
    },
    {
      title: "Link",
      dataIndex: "url",
      key: "url",
      render: (text: any) => text ? <Button icon={<LinkOutlined />} onClick={()=> copyUrl(text)}></Button> : <span>n/a</span>
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