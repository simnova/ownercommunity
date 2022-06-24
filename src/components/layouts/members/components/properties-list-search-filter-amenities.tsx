import { Checkbox, Collapse } from 'antd';
import { useEffect, useState, FC } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Amenities, FilterNames, SearchParamKeys } from '../../../../constants';
import { FacetDetail, FilterDetail } from '../../../../generated';

const { Panel } = Collapse;

const CheckboxGroup = Checkbox.Group;

interface AmenitiesFilterProps {
  selectedFilter?: FilterDetail;
  setSelectedFilter: (selectedFilter: FilterDetail) => void;
  amenitiesFacets?: FacetDetail[];
}
export const PropertiesListSearchFilterAmenities: FC<AmenitiesFilterProps> = (props) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>();

  const onAmenitiesFilterChange = (checkedValues: string[]) => {
    setSelectedAmenities(checkedValues);
    // update query string
    if (checkedValues.length > 0) {
      searchParams.set(SearchParamKeys.Amenities, checkedValues.join(','));
    } else {
      searchParams.delete(SearchParamKeys.Amenities);
    }
    setSearchParams(searchParams);
    props.setSelectedFilter({
      ...props.selectedFilter,
      listingDetail: { ...props.selectedFilter?.listingDetail, amenities: checkedValues }
    });
  };

  // Update UI (selected amenities) with corresponding amenities when page is loaded
  useEffect(() => {
    const qsAmenities = searchParams.get(SearchParamKeys.Amenities);
    setSelectedAmenities(qsAmenities?.split(',') ?? []);
  }, []);

  // handle when clear all filter clicked
  useEffect(() => {
    if (!location.search) {
      setSelectedAmenities([]);
    }
  }, [location]);
  
  const amenitiyFacets = props.amenitiesFacets ?? [{value: '', count: 0}];

  //May need to be changed 
  const amenities: string[] = []; 
  amenitiyFacets.forEach((amenityFacet) => {
    if (amenityFacet.value) {
      if (Amenities.includes(amenityFacet.value)) {
        amenities.push(amenityFacet.value);
      }
    }
  }
  )

  console.log('amen', amenities);

  const options = amenities.map((value) => {
    // const count = amenityFacet.count;
    const count = props.amenitiesFacets?.find((t: any) => t?.value === value)?.count;
    return {
      label:`${value} (${count})`,
      value: value
    };
  })

  console.log('options', options);

  return (
    <Collapse className="search-filter-collapse">
      <Panel header={<h2 className="font-bold">Amenities</h2>} key={FilterNames.Amenities}>
        <CheckboxGroup
          key={FilterNames.Amenities}
          // options={Amenities.map((value: string) => {
          //   const count = props.amenitiesFacets?.find((t: any) => t?.value === value)?.count;
          //   return {
          //     label: `${value} ${
          //       count !== undefined && count !== null && count > 0
          //         ? `(${count})`
          //         : count === 0
          //         ? '(0)'
          //         : ''
          //     }`,
          //     value: value
          //   };
          // })}
          options={options}
          value={selectedAmenities}
          onChange={(checkedValues) => onAmenitiesFilterChange(checkedValues as string[])}
        />
      </Panel>
    </Collapse>
  );
};
