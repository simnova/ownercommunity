import { AdditionalAmenities, AdditionalAmenitiesValues } from '../../../../constants';
import { Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;

export const PropertiesListSearchFilterAdditionalAmenities = (props: any) => {
  return (
    <>
      <h2 className="font-bold">Additional Amenities</h2>
      <div style={{ paddingLeft: '20px' }}>
        {AdditionalAmenitiesValues.map((aam: AdditionalAmenities) => {
          return (
            <>
              <h2 className="font-bold">{aam.category}</h2>
              <CheckboxGroup
                key={aam.category}
                options={aam.amenities.map((value: string) => {
                  const count =
                    props.data?.propertiesSearch?.facets?.additionalAmenitiesAmenities?.find(
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
                value={
                  props.selectedAdditionalAmenities?.find((a: any) => a.category === aam.category)
                    ?.amenities
                }
                onChange={(checkedValues) =>
                  props.onAdditionalAmenitiesChange(aam.category, checkedValues as string[])
                }
              />
            </>
          );
        })}
      </div>
    </>
  );
};
