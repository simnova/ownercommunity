import { Radio } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { BedroomsFilterOptions } from '../../../../constants';

export const PropertiesListSearchFilterBedrooms = (props: any) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [bedrooms, setBedrooms] = useState<undefined | number>();

  const onBedroomsClicked = (e: any) => {
    setBedrooms(parseInt(e.target.value));
    if (e.target.value) {
      searchParams.set('bedrooms', e.target.value);
    } else {
      searchParams.delete('bedrooms');
    }
    setSearchParams(searchParams);
    props.setSelectedFilter({
      ...props.selectedFilter,
      listingDetail: { ...props.selectedFilter?.listingDetail, bedrooms: parseInt(e.target.value) }
    });
  };

  useEffect(() => {
    const qsbedrooms = searchParams.get('bedrooms');
    if (qsbedrooms) {
      setBedrooms(parseInt(qsbedrooms));
    }
  }, []);

  useEffect(() => {
    if (!location.search) {
      setBedrooms(undefined);
    }
  }, [location]);

  return (
    <>
      <h2 className="font-bold">Bedrooms</h2>
      <Radio.Group
        value={bedrooms?.toString()}
        defaultValue={bedrooms?.toString()}
        onChange={onBedroomsClicked}
        buttonStyle="solid"
        optionType="button"
        options={BedroomsFilterOptions}
      />
    </>
  );
};
