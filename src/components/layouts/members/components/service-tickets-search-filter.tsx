import { Collapse, Checkbox, Typography, AutoComplete } from 'antd';
import { MinusOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import _ from 'lodash';
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
  ];
  searchbar: boolean;
}

export const ServiceTicketsSearchFilter: React.FC<any> = (
  props: ServiceTicketSearchFilterProps
) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);

  useEffect(() => {
    resetOptions();
  }, []);

  const getOptions = (value: string | undefined) => {
    let uniqueNames: string[] = _.uniq(
      props.options.map((option: any) => option.name)
    );
    if (value) {
      uniqueNames = uniqueNames.filter((option) => {
        return option.startsWith(value);
      });
    }
    const uniqueOptions = uniqueNames.map((name) => ({ value: name }));
    setOptions(uniqueOptions);
  };

  const resetOptions = () => {
    getOptions(undefined);
  };

  const onChange = (value: string) => {
    getOptions(value);
  };

  return (
    <>
      <Collapse
        className="service-ticket-search-filter-collapse"
        defaultActiveKey={['1']}
        ghost
        style={{ width: '80%' }}
        expandIcon={({ isActive }) =>
          isActive ? (
            <MinusOutlined style={{ fontSize: '30px' }} />
          ) : (
            <PlusOutlined style={{ fontSize: '30px' }} />
          )
        }
      >
        <Panel
          header={
            <Title
              level={5}
              style={{ fontWeight: 700, marginBottom: 0, alignSelf: 'center' }}
            >
              {props.title}
            </Title>
          }
          key="1"
        >
          {props.searchbar && (
            <AutoComplete
              options={options}
              placeholder="Search"
              style={{ width: '40%' }}
              onChange={onChange}
              onClear={resetOptions}
              allowClear
            />
          )}
          {props.options && (
            <div
              className="search-filter-scrollbar"
              style={{ maxHeight: '182px', overflowY: 'auto' }}
            >
              {props.options.map((option: any) => {
                return (
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Checkbox>{option.name}</Checkbox>
                    <span>({option.count})</span>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>
      </Collapse>
    </>
  );
};

function resetOptions(props: ServiceTicketSearchFilterProps) {}
