import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { FC, useEffect } from 'react';
import { SelectableListItem } from './selectable-list-item';
import './selectable-list.css';

export interface SelectableListDataType {
  key: React.Key;
  title: string;
  requestInitial: string;
  timestamp: string;
  progress: string;
}

interface SelectableListProps {
  data: SelectableListDataType[];
  selectedRecord: SelectableListDataType | undefined;
  onSelectChange: (selectedRowKeys: React.Key) => void;
}
export const SelectableList: FC<SelectableListProps> = (props) => {

  const onRowChange = (selectedRowKeys: React.Key[]) => {
    props.onSelectChange(selectedRowKeys[0]);
  };

  const rowSelection: TableRowSelection<SelectableListDataType> = {
    selectedRowKeys: props.selectedRecord === undefined ? [] : [props.selectedRecord.key],
    onChange: onRowChange,
    type: 'radio',
  };
  const columns: ColumnsType<SelectableListDataType> = [
    {
      dataIndex: 'name',
      render: (text, record) => <SelectableListItem data={record} />
    }
  ];

  const selectRow = (record: SelectableListDataType) => {
    props.onSelectChange(record.key);
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
        className={'selectable-list without-selection-column'}
      />
    </>
  );
};
