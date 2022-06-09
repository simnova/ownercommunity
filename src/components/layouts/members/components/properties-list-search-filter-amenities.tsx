import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Amenities, FilterNames } from '../../../../constants';

const CheckboxGroup = Checkbox.Group;

export const PropertiesListSearchFilterAmenities = (props: any) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>();

  const onAmenitiesFilterChange = (checkedValues: string[]) => {
    setSelectedAmenities(checkedValues);
    // update query string
    if (checkedValues.length > 0) {
      searchParams.set('amenities', checkedValues.join(','));
    } else {
      searchParams.delete('amenities');
    }
    setSearchParams(searchParams);
    props.setSelectedFilter({
      ...props.selectedFilter,
      listingDetail: { ...props.selectedFilter?.listingDetail, amenities: checkedValues }
    });
  };

  // Update UI (selected amenities) with corresponding amenities when page is loaded
  useEffect(() => {
    const qsAmenities = searchParams.get('amenities');
    setSelectedAmenities(qsAmenities?.split(',') ?? []);
  }, []);

  useEffect(() => {
    if (!location.search) {
      setSelectedAmenities([]);
    }
  }, [location]);

  return (
    <>
      <h2 className="font-bold">Amenities</h2>
      <CheckboxGroup
        key={FilterNames.Amenities}
        options={Amenities.map((value: string) => {
          const count = props.data?.propertiesSearch?.facets?.amenities?.find(
            (t: any) => t?.value === value
          )?.count;
          return {
            label: `${value} ${
              count !== undefined && count !== null && count > 0
                ? `(${count})`
                : count === 0
                ? '(0)'
                : ''
            }`,
            value: value
          };
        })}
        value={selectedAmenities}
        onChange={(checkedValues) => onAmenitiesFilterChange(checkedValues as string[])}
      />
    </>
  );
};
