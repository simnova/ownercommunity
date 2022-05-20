import { useLazyQuery } from '@apollo/client';
import { MemberPropertiesListSearchContainerPropertiesDocument } from '../../../../generated';
import { PropertiesListSearch } from './properties-list-search';
import { Skeleton, Input } from 'antd';
import { useState } from 'react';

export const PropertiesListSearchContainer: React.FC<any> = (props) => {
  const [searchString, setSearchString] = useState('');
  const [gqlSearchProperties, { called, loading, data, error }] = useLazyQuery(
    MemberPropertiesListSearchContainerPropertiesDocument,
    {
      variables: { input: { searchString: searchString } }
    }
  );

  const handleSearch = (e: any) => {
    setSearchString(e.target.value);
    gqlSearchProperties({ variables: { input: { searchString: e.target.value } } });
  };

  return (
    <>
      <Input
        placeholder="Search properties"
        onPressEnter={handleSearch}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <PropertiesListSearch data={data?.propertiesSearch} />
    </>
  );
};
