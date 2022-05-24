import { useLazyQuery } from '@apollo/client';
import { MemberPropertiesListSearchContainerPropertiesDocument } from '../../../../generated';
import { PropertiesListSearch } from './properties-list-search';
import { Skeleton, Input, Button, Space, Checkbox } from 'antd';
import { useState } from 'react';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';

const CheckboxGroup = Checkbox.Group;

export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [searchString, setSearchString] = useState('');
  const [gqlSearchProperties, { called, loading, data, error }] = useLazyQuery(
    MemberPropertiesListSearchContainerPropertiesDocument,
    { fetchPolicy: 'network-only' }
  );
  const [typeOptions, setTypeOptions] = useState([
    { label: 'Condo', value: 'condo' },
    { label: 'Single Family', value: 'single family' },
    { label: 'Townhouse', value: 'townhouse' }
  ]);
  const [selectedTypes, setSelectedTypes] = useState<CheckboxValueType[]>([]);

  const handleSearch = (searchString: string) => {
    gqlSearchProperties({
      variables: {
        input: {
          searchString: searchString,
          options: { facets: ['type'], filters: selectedTypes as string[] }
        }
      }
    });
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setSelectedTypes(checkedValues);
  };

  var result = () => {
    if (error) {
      return <div>{JSON.stringify(error)}</div>;
    } else if (loading) {
      return <Skeleton active />;
    } else if (called && data) {
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
    }
    return <div>Search Please</div>;
  };

  return (
    <>
      <Space>
        <Input
          placeholder="Search properties"
          onPressEnter={(e: any) => handleSearch(e.target.value)}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />

        <Button type="primary" onClick={() => handleSearch(searchString)}>
          Search
        </Button>
      </Space>

      <div>
        <h1>Filters</h1>
        <h2>Type</h2>
        <CheckboxGroup options={typeOptions} onChange={onChange} />
      </div>
      {result()}
    </>
  );
};
