import { Space, Select } from 'antd';
import { MaxSquareFeetOptions, MinSquareFeetOptions } from '../../../../constants';
const { Option } = Select;

export const PropertiesListSearchFilterSquareFeet = (props: any) => {
  return (
    <>
      <h2 className="font-bold">Square Feet</h2>
      <Space split="-">
        <Select
          defaultValue={props.minSquareFeet}
          value={props.minSquareFeet}
          style={{ width: 100 }}
          onChange={(value) => props.onSquareFeetChanged('min', value)}
        >
          {MinSquareFeetOptions.map((op) => (
            <Option key={op.value} value={op.value} disabled={op.value > props.maxSquareFeet}>
              {op.label}
            </Option>
          ))}
        </Select>

        <Select
          defaultValue={props.maxSquareFeet}
          value={props.maxSquareFeet}
          style={{ width: 100 }}
          onChange={(value) => props.onSquareFeetChanged('max', value)}
        >
          {MaxSquareFeetOptions.map((op) => (
            <Option key={op.value} value={op.value} disabled={op.value < props.minSquareFeet}>
              {op.label}
            </Option>
          ))}
        </Select>
      </Space>
    </>
  );
};
