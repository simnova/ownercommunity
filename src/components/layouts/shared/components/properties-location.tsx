import { AutoComplete, Button, Form, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { addressQuery } from '../../../../constants';
import { PropertyUpdateInput } from '../../../../generated';

const { Paragraph } = Typography;

interface AddressDataType {
  value: string;
  label: string;
  key: string;
  address: any;
  lat: number;
  long: number;
}

export const PropertiesLocation = (props: any) => {
  const [value, setValue] = useState('');
  const [addresses, setAddresses] = useState<AddressDataType[]>([]);
  const [, setCurrentAddress] = useState<any>('');
  const [, setCurrentPoint] = useState<number[]>([0, 0]);
  const [form] = Form.useForm();
  const [formLoading, setFormLoading] = React.useState(false);
  console.log(props);

  const onChange = async (addressInput: string) => {
    setValue(addressInput);
    let tmp: AddressDataType[] = [];
    if (addressInput.length >= 4) {
      await addressQuery(addressInput, props.data.property.mapSASToken).then((addressData) => {
        addressData.filter((address: any) => {
          if (address.address.streetNumber && address.address.streetName) {
            tmp.push({
              label: address.address.freeformAddress,
              value: address.address.freeformAddress,
              key: address.id,
              address: address.address,
              lat: address.position.lat,
              long: address.position.lon
            });
          }
        });
        setAddresses(tmp);
      });
    }
  };

  const onSelect = (option: any) => {
    console.log('options', option);
    setCurrentAddress(option.address);
    setCurrentPoint([option.lat, option.long]);
    form.setFieldsValue({
      location: {
        address: {
          streetNumber: option.address.streetNumber ? option.address.streetNumber : ' ',
          streetName: option.address.streetName ? option.address.streetName : ' ',
          postalCode: option.address.postalCode ? option.address.postalCode : ' ',
          extendedPostalCode: option.address.extendedPostalCode ? option.address.extendedPostalCode : ' ',
          country: option.address.country ? option.address.country : ' ',
          countryCode: option.address.countryCode ? option.address.countryCode : ' ',
          countryCodeISO3: option.address.countryCodeISO3 ? option.address.countryCodeISO3 : ' ',
          countrySubdivisionName: option.address.countrySubdivisionName ? option.address.countrySubdivisionName : ' ',
          countrySubdivision: option.address.countrySubdivision ? option.address.countrySubdivision : ' ',
          countrySecondarySubdivision: option.address.countrySecondarySubdivision
            ? option.address.countrySecondarySubdivision
            : ' ',
          countryTertiarySubdivision: option.address.countryTertiarySubdivision
            ? option.address.countryTertiarySubdivision
            : ' ',
          freeformAddress: option.address.freeformAddress ? option.address.freeformAddress : ' ',
          municipality: option.address.municipality ? option.address.municipality : ' ',
          localName: option.address.localName ? option.address.localName : ' ',
          municipalitySubdivision: option.address.municipalitySubdivision
            ? option.address.municipalitySubdivision
            : ' ',
          streetNameAndNumber: option.address.streetNameAndNumber ? option.address.streetNameAndNumber : ' ',
          routeNumbers: option.address.routeNumbers ? option.address.routeNumbers : ' ',
          crossStreet: option.address.crossStreet ? option.address.crossStreet : ' '
        },
        position: {
          coordinates: [option.lat, option.long]
        }
      }
    });
  };

  return (
    <div>
      <Paragraph>Search: </Paragraph>
      <AutoComplete
        options={addresses}
        style={{
          width: '75%',
          paddingBottom: '10px'
        }}
        filterOption={false}
        value={value}
        onChange={onChange}
        onSelect={onSelect}
      ></AutoComplete>

      <Form
        form={form}
        initialValues={props.data.property}
        onFinish={(values) => {
          setFormLoading(true);
          const property: PropertyUpdateInput = {
            id: props.data.property.id,
            ...values
          };
          props.onSave(property);
          setFormLoading(false);
        }}
        style={{
          width: '75%'
        }}
      >
        <Form.Item name={['location', 'address', 'streetNumber']} label="Street Number">
          <Input disabled placeholder="Street Number" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'streetName']} label="Street Name">
          <Input disabled placeholder="Street Name" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'countryTertiarySubdivision']} label="Country Tertiary Subdivision">
          <Input disabled placeholder="Country Tertiary Subdivision" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'countrySecondarySubdivision']} label="Country Secondary Subdivision">
          <Input disabled placeholder="Country Secondary Subdivision" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'countrySubdivision']} label="Country Subdivision">
          <Input disabled placeholder="Country Subdivision" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'countrySubdivisionName']} label="Country Subdivision Name">
          <Input disabled placeholder="Country Subdivision Name" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'municipality']} label="Municipality">
          <Input disabled placeholder="Country Municipality" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'municipalitySubdivision']} label="Municipality Subdivision">
          <Input disabled placeholder="Country Municipality Subdivision" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'localName']} label="Local Name">
          <Input disabled placeholder="Local Name" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'postalCode']} label="Zip Code">
          <Input disabled placeholder="Zip Code" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'extendedPostalCode']} label="Extended Zip Code">
          <Input disabled placeholder="Extended Zip Code" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'country']} label="Country">
          <Input disabled placeholder="Country" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'countryCode']} label="Country Code">
          <Input disabled placeholder="Country Code" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'countryCodeISO3']} label="Country Code ISO3">
          <Input disabled placeholder="Country Code ISO3" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'freeformAddress']} label="Free Form Address">
          <Input disabled placeholder="Free Form Address" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'streetNameAndNumber']} label="Street Name and Number">
          <Input disabled placeholder="Free Form Address" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'routeNumbers']} label="Route Numbers">
          <Input disabled placeholder="Route Numbers" />
        </Form.Item>
        <Form.Item name={['location', 'address', 'crossStreet']} label="Cross Street">
          <Input disabled placeholder="Cross Street" />
        </Form.Item>
        <Form.Item name={['location', 'position', 'coordinates']} label="Coordinates (Lat, Lon)">
          <Input disabled placeholder="Coordinates" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" value={'save'} loading={formLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
