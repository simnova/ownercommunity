import { Table } from 'antd';
import { FC, useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import './selectable-list-using-table.css';
import { SelectableListItem } from './selectable-list-item';

export interface SelectableListDataType {
  key: React.Key;
  title: string;
  requestInitial: string;
  timestamp: string;
  progress: string;
}

interface SelectableListProps {
  selectionType: 'single' | 'multiple';
  showSelectionColumn: boolean;
  data: SelectableListDataType[];
}
export const SelectableList: FC<SelectableListProps> = (props) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    if (selectedRowKeys.length === 0 && props.data.length > 0) {
      setSelectedRowKeys([props.data[0].key]);
    }
  }, [props.data]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<SelectableListDataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: props.selectionType === 'single' ? 'radio' : 'checkbox' // single for radio, multiple for checkbox
  };
  const columns: ColumnsType<SelectableListDataType> = [
    {
      dataIndex: 'name',
      render: (text, record) => <SelectableListItem data={record} />
    }
  ];

  const selectRow = (record: SelectableListDataType) => {
    // select 1 row only if radio selection type
    if (props.selectionType === 'single') {
      setSelectedRowKeys([record.key]);
      console.log('selectedRowKeys: ', [record.key]);
      return;
    }

    // select multiple rows if checkbox selection type
    if (props.selectionType === 'multiple') {
      const newSelectedRowKeys = [...selectedRowKeys];
      const index = newSelectedRowKeys.indexOf(record.key);
      if (index === -1) {
        newSelectedRowKeys.push(record.key);
      } else {
        newSelectedRowKeys.splice(index, 1);
      }
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };

  return (
    <>
      <Table
        onRow={(record) => ({
          onClick: () => {
            selectRow(record);
          }
        })}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={props.data}
        pagination={false}
        className={props.showSelectionColumn ? 'selectable-list' : 'selectable-list without-selection-column'}
      />
    </>
  );
};
