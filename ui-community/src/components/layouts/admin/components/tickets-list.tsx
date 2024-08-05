import { Button, Pagination, PaginationProps, Table } from 'antd';
import { Content } from 'antd/es/layout/layout';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ServiceTicketSearchParamKeys } from '../../../../constants';
const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items `;
export const ServiceTicketsList: React.FC<any> = (props) => {
  const navigate = useNavigate();

  const handlePagination = (page: number) => {
    props.searchParams.set(ServiceTicketSearchParamKeys.Page, page.toString());
    props.setSearchParams(props.searchParams);
    props.handleSearch();
  };

  const handleShowSizeChange = (_: number, size: number) => {
    props.searchParams.set(ServiceTicketSearchParamKeys.Top, size.toString());
    props.setSearchParams(props.searchParams);
    props.handleSearch();
  };
  const columns = [
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text: any, record: any) => {
        return (
          <Button type="primary" size="small" onClick={() => navigate(`${record.ticketType}/${text}`)}>
            Edit
          </Button>
        );
      }
    },
    {
      title: 'Type',
      dataIndex: 'ticketType',
      key: 'ticketType',
      render: (text: string) => {
        switch (text) {
          case 'ViolationTicketType':
            return 'Violation';
          case 'ServiceTicketType':
            return 'Service Request';
          default:
            return text;
        }
      }
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Requestor',
      dataIndex: ['requestor'],
      key: 'requestor'
    },
    {
      title: 'Assigned To',
      dataIndex: ['assignedTo'],
      key: 'assignedTo'
    },
    {
      title: 'Priority',
      dataIndex: ['priority'],
      key: 'priority'
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text: any) => <span>{dayjs(text).format('MM/DD/YYYY')}</span>
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => <span>{dayjs(text).format('MM/DD/YYYY')}</span>
    }
  ];
  console.table(props.data?.serviceTicketsResults);
  return (
    <Content>
        <Pagination
          className="search-pagination"
          current={parseInt(props.searchParams.get(ServiceTicketSearchParamKeys.Page) ?? '1')}
          total={props.data.count}
          pageSize={parseInt(props.searchParams.get(ServiceTicketSearchParamKeys.Top) ?? '10')}
          pageSizeOptions={['5', '10', '25', '50']}
          onChange={(page) => handlePagination(page)}
          showTotal={showTotal}
          showSizeChanger
          onShowSizeChange={(_: number, size: number) => handleShowSizeChange(_, size)}
        />
        <Table
          columns={columns}
          dataSource={props.data.serviceTicketsResults}
          pagination={false}
          rowKey={(record: any) => record.id}
        />
        <Pagination
          className="search-pagination"
          current={parseInt(props.searchParams.get(ServiceTicketSearchParamKeys.Page) ?? '1')}
          total={props.data.count}
          onChange={(page) => handlePagination(page)}
          showTotal={showTotal}
        />
      </Content>
  );
};
