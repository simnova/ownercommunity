import React, { useState } from 'react';
import { AutoComplete, Form, Input, Typography, Button } from 'antd';
import { PropertyUpdateInput } from '../../../../generated';

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
  console.log(props);

  const addressQuery = async (addressRequest: string) => {
    var addresssGeocodeServiceUrlTemplate: string = 'https://atlas.microsoft.com/search/address/json?typeahead=true&api-version=1&query={query}';
    //var addresssGeocodeServiceUrlTemplate: string = 'https://atlas.microsoft.com/geocode?api-version=2022-02-01-preview&addressLine={query}&top=10';

    var requestUrl = addresssGeocodeServiceUrlTemplate.replace('{query}', encodeURIComponent(addressRequest));
    const token = props.data.property.mapSASToken;
    console.log(token)


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

      return data.results;
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
    console.log(option)
    setCurrentAddress(option.address);
    form.setFieldsValue({
      location:
      {
        address: 
        {
          streetNumber: option.address.streetNumber,
          streetName: option.address.streetName,
          countrySecondarySubdivision: option.address.countrySecondarySubdivision,
          countrySubdivision: option.address.countrySubdivision,
          postalCode: option.address.postalCode,
          country: option.address.country,

        },
      
      } ,
    });
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
        initialValues={props.data.property}
        onFinish={(values) => {
          setFormLoading(true);
          var property: PropertyUpdateInput = {
            id: props.data.property.id,
            ...values
          }
          props.onSave(property);
          setFormLoading(false);
          
        }}     
        style={{
          width: '75%',
        }}
      >
        
        <Form.Item 
          name={["location","address", "streetNumber"]}
          label="Street Number"
          
        >
          <Input disabled placeholder='Street Number'  ></Input>
        </Form.Item>
        <Form.Item name={["location","address", "streetName"]} label="Street Name">
          <Input disabled placeholder='Street Name'></Input>
        </Form.Item>
        <Form.Item name={["location","address", "countrySecondarySubdivision"]} label="City">
          <Input disabled placeholder='City' ></Input>
        </Form.Item>
        <Form.Item name={["location","address", "countrySubdivision"]} label="State">
          <Input disabled placeholder='State'></Input>
        </Form.Item>
        <Form.Item name={["location","address", "postalCode"]} label="Zip Code">
          <Input disabled placeholder='Zip Code'></Input>
        </Form.Item>
        <Form.Item name={["location","address", "country"]} label="Country">
          <Input disabled placeholder='Country' ></Input>
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