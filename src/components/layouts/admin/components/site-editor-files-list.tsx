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
      width: "100%",
      sorter: ((a, b) => a.name.localeCompare(b.name)),
      render: (text: any) => text ? <span>{text.substring(text.indexOf('/')+1)}</span> : <span>n/a</span>
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      width: "100px",
      filters: [
        { text: '< 1 MB', value: '1' },
        { text: '1 MB - 2 MB', value: '2' },
        { text: '2 MB - 5 MB', value: '3' },
        { text: '>  5 MB', value: '4' },
      ],
      onFilter: (value: string|number|boolean, record:FileInfo) => {
        switch (value) {
          case '1':
            return record.size < (1 * 1024 * 1024);
          case '2':
            return record.size >= (1 * 1024 * 1024) && record.size < (2 * 1024 * 1024);
          case '3':
            return record.size >= (2 * 1024 * 1024) && record.size < (5 * 1024 * 1024);
          case '4':
            return record.size >= (5 * 1024 * 1024);
          default:
            return true
        }
      },
      sorter: (a, b) => a.size - b.size,
      render: (text: any) => text ? <span>{bytesToSize(text)}</span> : <span>n/a</span>
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "100px",
      filters: [
        { text: 'Images', value: 'IMAGE' },
        { text: 'PDFs', value: 'PDF' },
        { text: 'Files', value: 'FILE' },
      ],
      onFilter: (value: string|number|boolean, record:FileInfo) => {
        switch (value) {
          case 'IMAGE':
            return record.type.startsWith('image/');
          case 'PDF':
            return record.type.startsWith('application/pdf');
          case 'FILE':
            return record.type.startsWith('text/') || record.type.startsWith('application/json');
          default:
            return true
        }
      },
      sorter: ((a, b) => mimeTypeToFileType(a.type).localeCompare(mimeTypeToFileType(b.type))),
      render: (text: any) => text ? <span>{mimeTypeToFileType(text)}</span> : <span>n/a</span>
    },
    {
      title: "Link",
      dataIndex: "url",
      key: "url",
      width: "80px",
      render: (text: any) => text ? <Button icon={<LinkOutlined />} onClick={()=> copyUrl(text)}></Button> : <span>n/a</span>
    },
  ]

  let spaceUsed = (props.data.reduce((acc: number, cur: any) => {
    return acc + cur.size
  }, 0));

  return (<>
    <div style={{minHeight:'100%', display:'flex', flexDirection:'column'}}>
      <div style={{flex:1}}>
        <span>Space Used {bytesToSize(spaceUsed)} out of 50MB </span>
      </div>
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