import { Radio, Collapse } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BedroomsFilterOptions, FilterNames, SearchParamKeys } from '../../../../constants';
import { FacetDetail, FilterDetail } from '../../../../generated';

const { Panel } = Collapse;
interface PropertiesListSearchFilterBedroomsProps {
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  selectedFilter?: FilterDetail;
  bedroomsFacets?: FacetDetail[];
}

export const PropertiesListSearchFilterBedrooms: FC<PropertiesListSearchFilterBedroomsProps> = (
  props
) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [bedrooms, setBedrooms] = useState<undefined | number>();

  const onBedroomsClicked = (e: any) => {
    setBedrooms(parseInt(e.target.value));
    if (e.target.value) {
      searchParams.set(SearchParamKeys.Bedrooms, e.target.value);
    } else {
      searchParams.delete(SearchParamKeys.Bedrooms);
    }
    setSearchParams(searchParams);
    props.setSelectedFilter({
      ...props.selectedFilter,
      listingDetail: { ...props.selectedFilter?.listingDetail, bedrooms: parseInt(e.target.value) }
    });
  };

  useEffect(() => {
    const qsbedrooms = searchParams.get(SearchParamKeys.Bedrooms);
    if (qsbedrooms) {
      setBedrooms(parseInt(qsbedrooms));
    }
  }, []);

  // handle when clear all filter clicked
  useEffect(() => {
    if (!location.search.includes(SearchParamKeys.Bedrooms)) {
      setBedrooms(undefined);
    }
  }, [location]);

  return (
    <Radio.Group
      value={bedrooms}
      onChange={onBedroomsClicked}
      buttonStyle="solid"
      optionType="button"
      options={props.bedroomsFacets?.map((option) => {
        let value = option.value?.slice(0, -1);
        return {
          label: `${option.value} ${
            option.count != undefined && option.count > 0 ? `(${option.count})` : ''
          }`,
          value: value ? parseInt(value) : ''
        };
      })}
    />
  );
};
