import { Collapse, Checkbox, Typography, Input } from 'antd';
import { MinusOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Panel } = Collapse;
const { Search } = Input;

interface ServiceTicketSearchFilterProps {
  title: string;
  options: [
    {
      name: string;
      count: number;
    }
  ]
  searchbar: boolean;
}

export const ServiceTicketsSearchFilter: React.FC<any> = (props: ServiceTicketSearchFilterProps) => {
  return (
    <>
      <Collapse
        className="service-ticket-search-filter-collapse" 
        defaultActiveKey={['1']} 
        ghost 
        style={{ width: '80%' }}
        expandIcon={({ isActive }) => isActive ? <MinusOutlined style={{ fontSize: '30px' }} /> : <PlusOutlined style={{ fontSize: '30px' }} />}
      >
        <Panel 
          header={
            <Title 
              level={5} 
              style={{ fontWeight: 700, marginBottom: 0, alignSelf: 'center' }}>
                {props.title}
            </Title>
          } 
          key="1"
        >
          {props.searchbar && 
            <Search 
              allowClear 
              placeholder='Search'
              suffix={<SearchOutlined />}
          />}
          {props.options && <div className='search-filter-scrollbar' style={{ maxHeight: '182px', overflowY: 'auto' }}>
            {props.options.map((option: any) => {
            return (
              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Checkbox>{option.name}</Checkbox>
                <span>({option.count})</span>
              </div>
            )
          })}
          </div>}

        </Panel>
      </Collapse>
    </>
  )
}