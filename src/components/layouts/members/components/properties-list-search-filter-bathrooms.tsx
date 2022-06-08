import { Radio } from 'antd';
import { BathroomsFilterOptions } from '../../../../constants';

export const PropertiesListSearchFilterBathrooms = (props: any) => {
  return (
    <>
      <h2 className="font-bold">Bathrooms</h2>
      <Radio.Group
        value={props.bathrooms?.toString()}
        defaultValue={props.bathrooms?.toString()}
        onChange={props.onBathroomsClicked}
        buttonStyle="solid"
        optionType="button"
        options={BathroomsFilterOptions}
      />
    </>
  );
};
