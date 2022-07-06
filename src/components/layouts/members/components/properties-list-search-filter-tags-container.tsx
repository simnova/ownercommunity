import { useQuery } from '@apollo/client';
import {
  FacetDetail,
  FilterDetail,
  MemberPropertiesGetAllTagsDocument
} from '../../../../generated';
import { Skeleton } from 'antd';
import { FC } from 'react';
import { PropertiesListSearchFilterTags } from './properties-list-search-filter-tags';

interface PropertiesListSearchFilterTagsContainerProps {
  selectedFilter?: FilterDetail;
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  tagsFacets?: FacetDetail[];
}

export const PropertiesListSearchFilterTagsContainer: FC<PropertiesListSearchFilterTagsContainerProps> =
  (props) => {
    const {
      data: data,
      loading: loading,
      error: error
    } = useQuery(MemberPropertiesGetAllTagsDocument);

    if (error) {
      return <div>{JSON.stringify(error)}</div>;
    } else if (loading) {
      return <Skeleton active />;
    } else if (data) {
      return (
        <PropertiesListSearchFilterTags
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
          tagsFacets={props.tagsFacets as FacetDetail[]}
          allTags={data.getAllPropertyTags as string[]}
        />
      );
    }
    return null;
  };
