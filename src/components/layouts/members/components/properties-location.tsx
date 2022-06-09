import React, { useState } from 'react';
import { AutoComplete, Form, Input, Typography, Button } from 'antd';

const { Paragraph } = Typography;

interface AddressDataType {
  'value': string,
  'label': string,
  'key': string,
  'address': any
}

export const PropertiesLocation = (props: any) => {
  const [value, setValue] = useState('');
  const [addresses, setAddresses] = useState<AddressDataType[]>([]);
  const [currentAddress, setCurrentAddress] = useState<any>('');
  const [form] = Form.useForm();
  const [formLoading,setFormLoading] = React.useState(false);

  const addressQuery = async (addressRequest: string) => {
    var addresssGeocodeServiceUrlTemplate: string = 'https://atlas.microsoft.com/search/address/json?typeahead=true&api-version=1&query={query}';
    //var addresssGeocodeServiceUrlTemplate: string = 'https://atlas.microsoft.com/geocode?api-version=2022-02-01-preview&addressLine={query}&top=10';

    var requestUrl = addresssGeocodeServiceUrlTemplate.replace('{query}', encodeURIComponent(addressRequest));
    const token = props.data.property.mapSASToken;

    const address = async () => { 

      const request =  await fetch(requestUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Authorization': 'jwt-sas ' + token,
        'Content-Type': 'application/json; charset=utf-8'
        }
      });
      
      const data = await request.json();
      //console.log(data.features);

      return data.results;
      // return data.features;
    }

    return address();
  }

  const onChange = (data: string) => {
    setValue(data);
    let tmp: AddressDataType[] = [];
    if (data.length >= 4) {
      addressQuery(data).then(addressData => {
        addressData.filter((address: any) => {
          if (address.address.streetNumber && address.address.streetName) {
            console.log(address.address);
            tmp.push({
                "label" : address.address.freeformAddress,
                "value" : address.address.freeformAddress,
                "key" : address.id,
                "address" : address.address
              });
            // return address
          }
        })
        setAddresses(tmp)});

          // addressData.forEach((address: any) => {
            // console.log(address.properties.address.formattedAddress);
            // tmp.push({ "value" : address.address.freeformAddress})
            // tmp.push({ "value" : address.properties.address.formattedAddress});
          // });
      // }).finally(() => {
      //   setAddresses(tmp);
      // });
    }
  }

  const onSelect = (value: any, option: any) => {
    setCurrentAddress(option.address);
  }

  return (
    <div>
      <Paragraph>Search: </Paragraph>
      <AutoComplete
        options={addresses}
        style={{
          width: '75%',
          paddingBottom: '10px',
        }}
        filterOption={ false } 
        value={value}
        onChange={onChange}
        onSelect={onSelect}
        
      >
      </AutoComplete>

      <Form 
        form={form}   
        // initialValues={props.data}
        onFinish={(values) => {
          setFormLoading(true);
          props.onSave(values);
          setFormLoading(false);
        }}     
        style={{
          width: '75%',
        }}
      >
        <Form.Item label="Street Number">
          <Input disabled placeholder='Street Number' value={currentAddress["streetNumber"]} ></Input>
        </Form.Item>
        <Form.Item label="Street Name">
          <Input disabled placeholder='Street Name' value={currentAddress["streetName"]}></Input>
        </Form.Item>
        <Form.Item label="City">
          <Input disabled placeholder='City' value={currentAddress["countrySecondarySubdivision"]}></Input>
        </Form.Item>
        <Form.Item label="State">
          <Input disabled placeholder='State' value={currentAddress["countrySubdivision"]}></Input>
        </Form.Item>
        <Form.Item label="Zip Code">
          <Input disabled placeholder='Zip Code'value={currentAddress["postalCode"]}></Input>
        </Form.Item>
        <Form.Item label="Country">
          <Input disabled placeholder='Country' value={currentAddress["country"]}></Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" value={'save'} loading={formLoading}>
            Save
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}