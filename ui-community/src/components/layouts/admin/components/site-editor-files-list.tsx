import { LinkOutlined } from '@ant-design/icons';
import { Button, Modal, Table, TableColumnsType, notification, TablePaginationConfig } from 'antd';
import copy from 'copy-to-clipboard';
import ResizeObserver from 'rc-resize-observer';
import React, { useState } from 'react';
import { FileInfo } from '../../../../generated';
import './site-editor-files-list.css';

export interface SiteEditorFilesListProps {
  initialPageSize: number;
  initialCurrentPage: number;
  data: FileInfo[];
  onRemove: (fileName: string) => void;
}

export const SiteEditorFilesList: React.FC<SiteEditorFilesListProps> = (props) => {
  const [tableHeight, setTableHeight] = useState(0);
  const [currentPage, setCurrentPage] = useState(props.initialCurrentPage ?? 1);
  const [pageSize, setPageSize] = useState(props.initialPageSize ?? 10);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileInfo | undefined>(undefined);
  //const scroll = true;

  const handleTableChange = (pagination: TablePaginationConfig) => {
    if (pagination.current !== undefined) {
      setCurrentPage(pagination.current);
    }
    if (pagination.pageSize !== undefined) {
      setPageSize(pagination.pageSize);
    }
  };

  const pageSizeOptions = ['5', '10', '20', '50'];

  const handlePageSize = (_current: number | undefined, size: number) => {
    setPageSize(size);
  };

  const bytesToSize = (bytes: number): string => {
    const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i: number = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString());
    if (i === 0) return `${bytes} ${sizes[i]}`;
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const mimeTypeToFileType = (mimeType: string): string => {
    if (mimeType === 'text/plain') {
      return 'TEXT';
    } else if (mimeType.startsWith('image/') || mimeType.startsWith('application/') || mimeType.startsWith('text/')) {
      return mimeType.substring(mimeType.indexOf('/') + 1).toUpperCase();
    } else {
      return 'file';
    }
  };

  const copyUrl = (url: string) => {
    copy(url);
    notification.success({
      message: 'Copied to Clipboard',
      description: 'The link has been copied to your clipboard'
    });
  };

  const columns: TableColumnsType<FileInfo> = [
    {
      title: 'File',
      dataIndex: 'name',
      key: 'name',
      width: '100%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: any, record: FileInfo) =>
        text ? (
          <Button
            type="link"
            onClick={() => {
              setSelectedFile(record);
              setShowModal(true);
            }}
          >
            {text.substring(text.indexOf('/') + 1)}
          </Button>
        ) : (
          <span>n/a</span>
        )
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      width: '100px',
      filters: [
        { text: '< 1 MB', value: '1' },
        { text: '1 MB - 2 MB', value: '2' },
        { text: '2 MB - 5 MB', value: '3' },
        { text: '>  5 MB', value: '4' }
      ],
      onFilter: (value: boolean | React.Key, record: FileInfo) => {
        switch (value) {
          case '1':
            return record.size < 1024 * 1024;
          case '2':
            return record.size >= 1024 * 1024 && record.size < 2 * 1024 * 1024;
          case '3':
            return record.size >= 2 * 1024 * 1024 && record.size < 5 * 1024 * 1024;
          case '4':
            return record.size >= 5 * 1024 * 1024;
          default:
            return true;
        }
      },
      sorter: (a, b) => a.size - b.size,
      render: (text: any) => (text ? <span>{bytesToSize(text)}</span> : <span>n/a</span>)
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '100px',
      filters: [
        { text: 'Images', value: 'IMAGE' },
        { text: 'PDFs', value: 'PDF' },
        { text: 'Files', value: 'FILE' }
      ],
      onFilter: (value: boolean | React.Key, record: FileInfo) => {
        switch (value) {
          case 'IMAGE':
            return record.type.startsWith('image/');
          case 'PDF':
            return record.type.startsWith('application/pdf');
          case 'FILE':
            return record.type.startsWith('text/') || record.type.startsWith('application/json');
          default:
            return true;
        }
      },
      sorter: (a, b) => mimeTypeToFileType(a.type).localeCompare(mimeTypeToFileType(b.type)),
      render: (text: any) => (text ? <span>{mimeTypeToFileType(text)}</span> : <span>n/a</span>)
    },
    {
      title: 'Link',
      dataIndex: 'url',
      key: 'url',
      width: '80px',
      render: (text: any) =>
        text ? <Button icon={<LinkOutlined />} onClick={() => copyUrl(text)}></Button> : <span>n/a</span>
    }
  ];

  let spaceUsed = props.data.reduce((acc: number, cur: any) => {
    return acc + cur.size;
  }, 0);

  let preview = (file: FileInfo): React.JSX.Element => {
    if (file.type.startsWith('image/')) {
      return (
        <img
          src={file.url}
          alt="File Preview"
          className="file-preview-img"
        />
      );
    } else if (file.type.startsWith('application/pdf')) {
      return <embed src={file.url} className="file-preview-pdf" />;
    } else {
      return <p>Preview not available for this file type</p>;
    }
  };

  return (
    <>
      <Modal
        title="File Preview"
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}
        className="modal-custom-style"
      >
        <div className="centered-container">
          {selectedFile && preview(selectedFile)}
        </div>
      </Modal>

      <div className="site-editor-files-list">
        <div className="site-editor-files-list-header">
          <div className="site-editor-files-list-header-title">Files</div>
          <div className="site-editor-files-list-header-space-used">
            <div>Space Used:</div>
            <div>{bytesToSize(spaceUsed)}</div>
          </div>
        </div>

        <ResizeObserver onResize={(rect) => setTableHeight(rect.height)}>
          <div className="site-editor-files-list-table">
            <Table
              //scroll={scroll}
              columns={columns}
              dataSource={props.data}
              pagination={{ 
                current: currentPage, 
                pageSize: pageSize, 
                total: props.data.length, 
                showSizeChanger: true, 
                pageSizeOptions: pageSizeOptions, 
                onShowSizeChange: handlePageSize,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                position: ['topRight', 'bottomRight'] 
              }}
              onChange={handleTableChange}
              rowKey="name"
              size="small"
              style={{ height: tableHeight }}
            />
          </div>
        </ResizeObserver>
      </div>
    </>
  );
};

SiteEditorFilesList.defaultProps = {
  initialPageSize: 10,
  initialCurrentPage: 1
};

export default SiteEditorFilesList;
