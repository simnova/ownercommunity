import { Checkbox } from 'antd';
import { Amenities, FilterNames } from '../../../../constants';

const CheckboxGroup = Checkbox.Group;

export const PropertiesListSearchFilterAmenities = (props: any) => {
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
        value={props.selectedAmenities}
        onChange={(checkedValues) => props.onAmenitiesFilterChange(checkedValues as string[])}
      />
    </>
  );
};
