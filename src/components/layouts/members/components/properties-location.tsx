import React, { useState } from 'react';
import { AutoComplete } from 'antd';

interface AddressDataType {
  'value': string;
}

export const PropertiesLocation = (props: any) => {
  const [value, setValue] = useState('');
  const [addresses, setAddresses] = useState<AddressDataType[]>([]) ;

  const addressQuery = async (addressRequest: string) => {
    var addresssGeocodeServiceUrlTemplate: string = 'https://atlas.microsoft.com/search/address/json?typeahead=true&api-version=1&query={query}';

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

      return data.results;
    }

    return address();
  }

  const onChange = (data: any) => {
    setValue(data);
    let tmp: any[] = [];
    addressQuery(data).then(data => {
      data.forEach((address: any) => {
        tmp.push({ "value" : address.address.freeformAddress})
      });
    }).finally(() => {
      setAddresses(tmp);
    });
  }

  return (
    <div>
      <p>Search:</p>
      <AutoComplete
        options={addresses}
        style={{
          width: 400,
        }}
        filterOption={(inputValue, value) =>
          value?.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        value={value}
        onChange={onChange}
        
      >
      </AutoComplete>
      
      {/* <h2>{JSON.stringify(props)}</h2> */}
    </div>
  )
}