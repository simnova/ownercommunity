import { Select, Input } from 'antd';
import React, { useEffect, useState } from 'react';

// const options = [
//   'Cable',
//   'Pool (Private)',
//   'Pool (Public)',
//   'Gym',
//   'Washer/Dryer (Private)',
//   'Washer/Dryer (Public)'
// ];

export interface SelectTagsProps {
  options?: string[];
  value?: string[];
  onChange?: (tags:string[]) => void;
  label?: string;
}

export const SelectTags: React.FC<SelectTagsProps> = (props) => {


  const [selectedItems, setSelectedItems] = useState<string[]>(props.value ?? []);

  const filteredOptions = props.options?.filter((option: string) => !selectedItems.includes(option));

  useEffect(() => {
    props.onChange!(selectedItems);
  }, [selectedItems, props.onChange]);

  
  const onSelectChanged = (values: string[]) => {
    // console.log(values)
    setSelectedItems(values)
  }

  return (
    <>
      <Select
        mode="multiple"
        placeholder={props.label}
        value={selectedItems}
        
        onChange={(values) => {onSelectChanged(values)}}
        style={{ width: '100%' }}
      >
        {filteredOptions?.map((item: any) => (
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        ))}
      </Select>
    
    </>
  );
};
