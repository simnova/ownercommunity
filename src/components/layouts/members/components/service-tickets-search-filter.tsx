import { Collapse, Checkbox, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Panel } = Collapse;

interface ServiceTicketSearchFilterProps {
  title: string;
  options: [
    {
      name: string;
      count: number;
    }
  ]
}

export const ServiceTicketSearchFilter: React.FC<any> = (props: ServiceTicketSearchFilterProps) => {
  return (
    <>
      <Collapse
        className="service-ticket-search-filter-collapse" 
        defaultActiveKey={['1']} 
        ghost 
        style={{ width: '25%' }}
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
          {props.options.map((option: any) => {
            return (
              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Checkbox>{option.name}</Checkbox>
                <span>({option.count})</span>
              </div>
            )
          })}
        </Panel>
      </Collapse>
    </>
  )
}