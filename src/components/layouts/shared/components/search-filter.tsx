import { Collapse, Checkbox, Typography, AutoComplete, InputNumber, Slider, Radio } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useSearchParams } from 'react-router-dom';
import { FacetDetail } from '../../../../generated';
import { render } from '@headlessui/react/dist/utils/render';
const { Title } = Typography;
const { Panel } = Collapse;

interface SearchFilterOption {
  name: string;
  count: number;
  id: string;
}

export interface SearchFilterConfigDefinition {
  filters: {
    title: string;
    searchId: string[];
    searchbar?: boolean;
    values: any[];
    facet: string[];
    type?: 'checkbox' | 'slider' | 'inputNumber' | 'radio';
    handleCount?: (facet: FacetDetail, value?: any) => boolean;
    handleFilter?: (value: any) => string;
    handleBuild?: (filter: SearchFilterProps, value: any, count: number) => void;
  }[];
}

export interface SearchFilterProps {
  title: string;
  options: SearchFilterOption[];
  searchId: string[];
  searchbar?: boolean;
  type?: 'checkbox' | 'slider' | 'inputNumber' | 'radio';
}

export const SearchFilter: React.FC<SearchFilterProps> = (props) => {
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    resetOptions();
  }, []);

  const getOptions = (value: string | undefined) => {
    let uniqueNames: string[] = _.uniq(props.options?.map((option: any) => option.name));
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

  const onSelectCheckbox = (e: any, key: string) => {
    const searchId = props.searchId[0];
    if (e.target.checked) {
      const originalSearchParams = searchParams.get(searchId) ?? '';
      searchParams.set(searchId, originalSearchParams.length > 0 ? searchParams.get(searchId) + ',' + key : key);
      setSearchParams(searchParams);
    } else {
      const searchParamsString = searchParams.get(searchId)?.split(',');
      const newSearchParamsArray: any = [];
      searchParamsString?.forEach((searchParam) => {
        if (searchParam !== key) {
          newSearchParamsArray.push(searchParam);
        }
      });
      searchParams.set(searchId, newSearchParamsArray.join(','));
      if (searchParams.get(searchId) === '') {
        searchParams.delete(searchId);
      }
      setSearchParams(searchParams);
    }
  };

  const onChangeInputNumber = (value: any, optionId: string) => {
    const searchId = props.searchId.find((id: any) => id === optionId) ?? props.searchId[0];
    if (value === null) {
      searchParams.delete(searchId);
    } else {
      searchParams.set(searchId, value);
    }
    setSearchParams(searchParams);
  };

  const onChangeSlider = (value: [number, number]) => {
    const searchId = props.searchId[0];
    searchParams.set(searchId, `${value[0]},${value[1]}`);
    setSearchParams(searchParams);
  };

  const onChangeRadio = (e: any) => {
    const searchId = props.searchId[0];
    searchParams.set(searchId, e.target.value);
    setSearchParams(searchParams);
  };

  const isChecked = (id: string) => {
    const searchId = props.searchId[0];
    const searchParamsString = searchParams.get(searchId)?.split(',');
    if (searchParamsString) {
      return searchParamsString.includes(id);
    }
    return false;
  };

  const onSearchSelect = (value: string) => {
    const searchId = props.searchId[0];
    // get current ids from search params
    const originalIds = searchParams.get(searchId)?.split(',') ?? [];

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
    searchParams.set(searchId, newSearchParamsArray.join(','));
    setSearchParams(searchParams);
  };

  const renderOptions = (options: SearchFilterOption[]) => {
    switch (props.type) {
      case 'inputNumber':
        return (
          <>
            {options.map((option: any) => (
              <div style={{ display: 'flex', padding: '5px', width: '250px' }}>
                  <InputNumber id={option.id} onChange={(value: any) => onChangeInputNumber(value, option.id)} value={searchParams.get(option.id)} />
                  <label style={{ padding: "0px 10px"}}>{option.name}</label>
              </div>
            ))}
          </>
        );
      case 'slider':
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
            <Slider min={0} max={100} onChange={(e) => onChangeSlider([e, 100])} />
          </div>
        );
      case 'radio':
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
            <Radio.Group
              onChange={(e: any) => onChangeRadio(e)}
              optionType="button"
              options={options.map((option: any) => option.name)}
            />
          </div>
        );
      default:
        return (
          <>
            {options.map((option: any) => (
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '250px' }}>
                <Checkbox
                  key={option.id}
                  checked={isChecked(option.id)}
                  onChange={(e) => onSelectCheckbox(e, option.id)}
                >
                  {option.name}
                </Checkbox>
                <span>{option.count}</span>
              </div>
            ))}
          </>
        );
    }
  };

  return (
    <>
      <Collapse
        className="service-ticket-search-filter-collapse"
        defaultActiveKey={['1']}
        ghost
        style={{ width: '80%' }}
        expandIcon={({ isActive }) =>
          isActive ? <MinusOutlined style={{ fontSize: '30px' }} /> : <PlusOutlined style={{ fontSize: '30px' }} />
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
              className="search-filter-searchbar"
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
              {renderOptions(props.options)}
            </div>
          )}
        </Panel>
      </Collapse>
    </>
  );
};
