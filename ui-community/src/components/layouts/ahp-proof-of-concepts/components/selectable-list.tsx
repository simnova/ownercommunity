import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { FC } from 'react';
import { SelectableListItem } from './selectable-list-item';
import './selectable-list.css';

export interface SelectableListDataType {
  key: React.Key;
  title: string;
  initials: string;
  timestamp: string;
  progress: string;
  version: string;
  caseType: string;
}

interface SelectableListProps {
  data: SelectableListDataType[];
  selectedRecord: SelectableListDataType | undefined;
  onSelectChange: (selectedRowKeys: React.Key) => void;
}
export const SelectableList: FC<SelectableListProps> = (props) => {
  const onRowChange = (selectedRowKeys: React.Key[]) => {
    if (selectedRowKeys.length === 0) {
      return;
    }
    props.onSelectChange(selectedRowKeys[0]);
  };

  const rowSelection: TableRowSelection<SelectableListDataType> = {
    selectedRowKeys: props.selectedRecord === undefined ? [] : [props.selectedRecord.key],
    onChange: onRowChange,
    type: 'radio'
  };
  const columns: ColumnsType<SelectableListDataType> = [
    {
      dataIndex: 'name',
      render: (_, record) => <SelectableListItem data={record} />
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
        style={{backgroundColor: "transparent"}}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={props.data}
        pagination={false}
        className={'selectable-list without-selection-column'}
      />
    </>
  );
};
