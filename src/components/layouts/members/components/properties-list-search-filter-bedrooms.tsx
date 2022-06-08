import { Radio } from 'antd';
import { BedroomsFilterOptions } from '../../../../constants';

export const PropertiesListSearchFilterBedrooms = (props: any) => {
  return (
    <>
      <h2 className="font-bold">Bedrooms</h2>
      <Radio.Group
        value={props.bedrooms?.toString()}
        defaultValue={props.bedrooms?.toString()}
        onChange={props.onBedroomsClicked}
        buttonStyle="solid"
        optionType="button"
        options={BedroomsFilterOptions}
      />
    </>
  );
};
