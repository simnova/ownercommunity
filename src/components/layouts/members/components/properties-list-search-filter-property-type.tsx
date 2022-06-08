import { Checkbox } from 'antd';
import { FilterNames, PropertyTypes } from '../../../../constants';

const CheckboxGroup = Checkbox.Group;

export const PropertiesListSearchFilterPropertyType = (props: any) => {
  return (
    <>
      <h2 className="font-bold">Type </h2>
      <CheckboxGroup
        key={FilterNames.Type}
        options={PropertyTypes.map((value: string) => {
          const count = props.data?.propertiesSearch?.facets?.type?.find(
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
        value={props.selectedPropertyTypes}
        onChange={(checkedValues) => props.onPropertyTypeFilterChange(checkedValues as string[])}
      />
    </>
  );
};
