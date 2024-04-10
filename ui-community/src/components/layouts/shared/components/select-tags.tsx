import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

export interface SelectTagsProps {
  options?: string[];
  value?: string[];
  onChange?: (tags: string[]) => void;
  label?: string;
}

export const SelectTags: React.FC<SelectTagsProps> = (props) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(props.value ?? []);

  const filteredOptions = props.options?.filter((option: string) => !selectedItems.includes(option));

  useEffect(() => {
    setSelectedItems(props.value ?? []);
  }, [props.value]);

  const onSelectChanged = (values: string[]) => {
    // console.log(values)
    setSelectedItems(values);
    if (props.onChange) {
      props.onChange(values);
    }
  };

  return (
    <Select
      mode="multiple"
      placeholder={props.label}
      value={selectedItems}
      onChange={(values) => {
        onSelectChanged(values);
      }}
      style={{width: '100%'}}
    >
      {filteredOptions?.map((item: any) => (
        <Select.Option key={item} value={item}>
          {item}
        </Select.Option>
      ))}
    </Select>
  );
};
