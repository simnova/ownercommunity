import { FormTags } from '../../../ui/organisms/form-tags';
import { useState, useEffect } from 'react';

export const PropertiesListSearchTags: React.FC<any> = (props) => {
  const getSelectedFilters = () => {
    let tempList: string[] = [];
    const qsproperTypes = props.searchParams.get('type')?.split(',');
    const qsbedrooms = props.searchParams.get('bedrooms');
    const qsbathrooms = props.searchParams.get('bathrooms');
    const qsminPrice = props.searchParams.get('minPrice');
    const qsmaxPrice = props.searchParams.get('maxPrice');
    const qsminSquareFeet = props.searchParams.get('minSquareFeet');
    const qsmaxSquareFeet = props.searchParams.get('maxSquareFeet');
    const qsamenities = props.searchParams.get('amenities')?.split(',');
    const qsadditionalAmenities = props.searchParams.get('additionalAmenities')?.split(';');
    const qsdistance = props.searchParams.get('distance');
    const qsListedInfo = props.searchParams.get('listedInfo')?.split(',');
    const qslat = props.searchParams.get('lat');
    const qslong = props.searchParams.get('long');
    // const qsupdatedAt = props.searchParams.get(SearchParamKeys.UpdatedAt); // in days
    // const qscreatedAt = props.searchParams.get(SearchParamKeys.CreatedAt); // in days

    // if (qsproperTypes) {
    //   const propTypes = qsproperTypes.map((type) => 'Type:' + type);
    //   tempList.push(...propTypes);
    // }
    return tempList;
  };

  const [selectedFilterList, setSelectedFilterList] = useState<string[]>(getSelectedFilters());

  useEffect(() => {
    setSelectedFilterList(getSelectedFilters());
  }, [props.searchParams]);

  return (
    <div>
      {/* <Tag closable onClose={(e) => console.log(e.target)}>
          test
        </Tag> */}
      <FormTags value={selectedFilterList} onChange={setSelectedFilterList} />
    </div>
  );
};
