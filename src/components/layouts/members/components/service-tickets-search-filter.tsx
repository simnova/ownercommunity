import { Collapse, Checkbox, Typography, AutoComplete } from 'antd';
import { MinusOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSearchParams } from 'react-router-dom';
import { SearchParamKeys } from '../../../../constants';
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
      id: string;
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

    const onSearchSelect = (value: string) => {
      // let searchParamsArray = searchParams.get(props.id)?.split(',') ?? [];
      // const newSearchParamsArray: any = [];
      // const optionsIds = props.options?.filter((option: any) => {
      //   return option.name === value;
      // })
      // console.log('optionsIds', optionsIds);
      // searchParamsArray = searchParamsArray.concat(optionsIds.filter(option: any) => if (searchParamsArray.)));
      // searchParams.set(props.id, searchParamsArray?.join(','));
      // setSearchParams(searchParams);

      // get current ids from search params
      const originalIds = searchParams.get(props.id)?.split(',') ?? [];

      // get all ids for the selected option
      const optionsIds = props.options
        ?.filter((option: any) => {
          return option.name === value;
        })
        .map((option: any) => option.id);

      // add the selected option ids to the current search params if they are not already in there
      const newSearchParamsArray: any = originalIds;
      optionsIds?.forEach((option: any) => {
        if (!originalIds.includes(option)) {
          newSearchParamsArray.push(option);
        }
      });

      // set the new search params
      searchParams.set(props.id, newSearchParamsArray.join(','));
      setSearchParams(searchParams);
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
                onSelect={onSearchSelect}
                allowClear
              />
            )}
            {props.options && (
              <div
                className="search-filter-scrollbar"
                style={{
                  maxHeight: '182px',
                  overflowY: 'auto',
                  width: '300px'
                }}
              >
                {props.options.map((option: any) => {
                  return (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '250px'
                      }}
                    >
                      <Checkbox
                        key={option.id}
                        checked={isChecked(option.id)}
                        onChange={(e) => onSelect(e, option.id)}
                      >
                        {option.name}
                      </Checkbox>
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
