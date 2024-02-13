import { Table, Button, Layout, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { ServiceTicketSearchParamKeys } from '../../../../constants';

const { Content } = Layout;

const showTotal: PaginationProps['showTotal'] = (total) => `Total ${total} items `;

interface SearchTicketsListProps {
  data: any;
  handleSearch: () => void;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: URLSearchParams) => void;
}

export const ServiceTicketsList: React.FC<SearchTicketsListProps> = (props) => {
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

  const columnSearchParams = props.searchParams.get(ServiceTicketSearchParamKeys.Column)?.split(',');

  const columnOptions = [
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text: any) => (
        <Button type="primary" size="small" onClick={() => navigate(text)}>
          Edit
        </Button>
      )
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
      render: (text: any) => <span>{dayjs(text).format('DD/MM/YYYY')}</span>
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: any) => <span>{dayjs(text).format('DD/MM/YYYY')}</span>
    }
  ];

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

  return (
    <Layout style={{margin: '0px'}}>
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
    </Layout>
  );
};
