import { Collapse, Checkbox, Typography, AutoComplete } from 'antd';
import { MinusOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
const { Title } = Typography;
const { Panel } = Collapse;
const { Option } = AutoComplete;

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
  const [options, setOptions] = useState<{value: string}[]>([]);

  useEffect(() => {
    resetOptions();
  }, []);

  const resetOptions = () => {
    const uniqueNames: string[] = [];
    props.options.forEach(element => {
      const isDuplicate = uniqueNames.includes(element.name);
      if (!isDuplicate) {
        uniqueNames.push(element.name);
        return true;
      }
      return false;
    });
    const uniqueOptions = uniqueNames.map(name => ({ value: name }));
    console.log("UNIQUE OPTIONS ", uniqueOptions);
    setOptions(uniqueOptions);
  }

  const onChange = (value: string) => {
    const newOptions = options.filter(option => {
      return option.value.startsWith(value);
    })
    setOptions(newOptions);
  }

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
            <AutoComplete
              options={options}
              placeholder="Search"
              style={{ width: '40%' }}
              onChange={onChange}
              onClear={resetOptions}
              allowClear
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

function resetOptions(props: ServiceTicketSearchFilterProps) {
}
