import { Skeleton, Input, Button, Space, Checkbox, Radio, Slider, Row, Col, Select } from 'antd';
import {
  AdditionalAmenities,
  AdditionalAmenitiesValues,
  Amenities,
  BathroomsFilterOptions,
  BedroomsFilterOptions,
  FilterNames,
  MaxSquareFeetOptions,
  MinSquareFeetOptions,
  prices,
  PropertyTypes
} from '../../../../constants';
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

export const PropertiesListSearchFilters = (props: any) => {
  return (
    <>
      {/* Type */}
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
      {/* Bedrooms */}
      <h2 className="font-bold">Bedrooms</h2>
      <Radio.Group
        value={props.bedrooms?.toString()}
        defaultValue={props.bedrooms?.toString()}
        onChange={props.onBedroomsClicked}
        buttonStyle="solid"
        optionType="button"
        options={BedroomsFilterOptions}
      />

      {/* Bathrooms */}
      <h2 className="font-bold">Bathrooms</h2>
      <Radio.Group
        value={props.bathrooms?.toString()}
        defaultValue={props.bathrooms?.toString()}
        onChange={props.onBathroomsClicked}
        buttonStyle="solid"
        optionType="button"
        options={BathroomsFilterOptions}
      />

      {/* Amenities */}
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

      {/* Additional Amenities */}
      {/* Features */}
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
      {/* Price */}
      <h2 className="font-bold">Price</h2>
      <Slider
        range
        marks={prices}
        defaultValue={[props.minPrice, props.maxPrice]}
        max={1000000}
        min={0}
        step={null}
        onChange={(values) => props.onSliderPriceChanged(values)}
        tooltipVisible={false}
        value={[props.minPrice, props.maxPrice]}
      />
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div>Min price</div>
          <Input value={props.minPrice} onChange={(e) => props.onPriceChanged('min', e)} />
        </Col>
        <Col span={12}>
          <div>Max price</div>
          <Input value={props.maxPrice} onChange={(e) => props.onPriceChanged('max', e)} />
        </Col>
      </Row>

      {/* squareFeet */}
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
