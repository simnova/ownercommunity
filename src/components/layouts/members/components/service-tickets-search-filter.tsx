import { Collapse, Checkbox, Typography, AutoComplete } from 'antd';
import { MinusOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSearchParams } from 'react-router-dom';
const { Title } = Typography;
const { Panel } = Collapse;
const { Option } = AutoComplete;

interface ServiceTicketSearchFilterProps {
  title: string;
  id: string;
  options: [
    {
      name: string;
      count: number;
    }
  ];
  searchbar: boolean;
}

export const ServiceTicketsSearchFilter: React.FC<ServiceTicketSearchFilterProps> =
  (props) => {
    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      resetOptions();
    }, []);

    const getOptions = (value: string | undefined) => {
      let uniqueNames: string[] = _.uniq(
        props.options?.map((option: any) => option.name)
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

    const onSelect = (e: any, key: string) => {
      if (e.target.checked) {
        const originalSearchParams = searchParams.get(props.id) ?? '';
        searchParams.set(
          props.id,
          originalSearchParams.length > 0
            ? searchParams.get(props.id) + ',' + key
            : key
        );
        setSearchParams(searchParams);
        // console.log('onSelect', key);
      } else {
        const searchParamsString = searchParams.get(props.id)?.split(',');
        const newSearchParamsArray: any = [];
        searchParamsString?.forEach((searchParam) => {
          if (searchParam !== key) {
            newSearchParamsArray.push(searchParam);
          }
        });
        searchParams.set(props.id, newSearchParamsArray.join(','));
        if (searchParams.get(props.id) === '') {
          searchParams.delete(props.id);
        }
        setSearchParams(searchParams);
        // searchParams.get(props.key)?.split(',').forEach((value) => {});
      }
    };

    const isChecked = (id: string) => {
      const searchParamsString = searchParams.get(props.id)?.split(',');
      if (searchParamsString) {
        return searchParamsString.includes(id);
      }
      return false;
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
                style={{
                  fontWeight: 700,
                  marginBottom: 0,
                  alignSelf: 'center'
                }}
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
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Checkbox
                        key={option.id}
                        checked={isChecked(option.id)}
                        onChange={(e) => onSelect(e, option.id)}
                      >
                        {option.name}
                      </Checkbox>
                      <span className="mr-2">({option.count})</span>
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
