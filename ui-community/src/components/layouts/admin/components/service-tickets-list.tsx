import { Button, Table } from "antd"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"
import { ServiceTicketSearchParamKeys } from "../../../../constants"

interface SearchTicketsListProps {
  data: any;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
}

export const ServiceTicketsList: React.FC<SearchTicketsListProps> = (props) => {
  const navigate = useNavigate()
  const columnSearchParams = props.searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',');
  const columnOptions = [
    {
      title: "Action",
      dataIndex: "id",
      render: (text: any) => <Button type="primary" size="small" onClick={() => navigate(text)}>Edit</Button>
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Requestor",
      dataIndex: ["requestor"],  
      key: "requestor",
    },
    {
      title: "Assigned To",
      dataIndex: ["assignedTo"],
      key: "assignedTo",
    },
    {
      title: "Priority",
      dataIndex: ["priority"],  
      key: "priority",
    },
    {
      title: "Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: any) => <span>{dayjs(text).format('MM/DD/YYYY')}</span>
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any) => <span>{dayjs(text).format('MM/DD/YYYY')}</span>
    },
  ]

  let columns: any = [];

  if (columnSearchParams) {
    columns.push(columnOptions.find((option: any) => option.title === 'Action'));

    columnOptions.forEach((option: any) => {
      if (columnSearchParams.includes(option.title)) {
        columns.push(option); 
      }
    });
  } else {
    columns = columnOptions;
  }

  return <div>
    <Table
      columns={columns}
      dataSource={props.data?.serviceTicketsResults}
      rowKey={(record: any) => record.id}
    />
  </div>
}