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
    gqlSearchProperties({ variables: { input: { searchString: e.target.value } } });
  };

  var result = () => {
    if(error){
      return <div>{JSON.stringify(error)}</div>
    } else if(loading){
      return <Skeleton active />
    } else  if(called && data){
      return <div>{JSON.stringify(data)}</div>
    }
    return <div>Search Please</div>
  }

  return (
    <>
      <Input
        placeholder="Search properties"
        onPressEnter={handleSearch}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      
      {result()}
    </>
  );
};
