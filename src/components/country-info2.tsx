import { useNode, useEditor } from "@craftjs/core";
import { Button, Input } from 'antd';
import { gql, useQuery } from '@apollo/client';
import { useState } from "react";


interface CountryInfo2Prop {
  country: string;
}

const GET_COUNTRY_DETAILS = gql`
  query CountryDetails($country: ID!) {
      country(code: $country) {
        name
        native
        capital
        emoji
        currency
        languages {
          code
          name
        }
      }
    }
`;

let CountryInfo2:any;
CountryInfo2 = ({country, ...props} : CountryInfo2Prop ) => {
  const { connectors: { connect, drag }, selected } = useNode((state) =>(
    {
    selected: state.events.selected
  }));

  
  const { loading, data, error } = useQuery(
    GET_COUNTRY_DETAILS,
    { variables: { country: country}, context: { clientName: 'country' } }
  );

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  if (loading) return <>Loading...</>;

  if (error) return <>Error! ${error.message}</>;

  return (
    <div 
      className="px-4 py-2"
      ref={ref => connect(drag(ref as HTMLDivElement))} 
      {...props}
      >
      { data && data.country && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="bg-white px-4 py-5 border-b border-gray-200">
            <div className="text-sm text-gray-500">Details for Country:</div>
            <div className="text-lg text-gray-900 col-psan-2">{data.country.name}</div>
          </div>
          <div className="grid grid-cols-3 bg-gray-50 px-4 py-2">
            <div className="text-sm text-gray-500">Capital</div>
            <div className="text-sm text-gray-900 col-psan-2">{data.country.capital}</div>
          </div>
          <div className="grid grid-cols-3 bg-white px-4 py-2">
            <div className="text-sm text-gray-500">Emoji</div>
            <div className="text-sm text-gray-900 col-psan-2">{data.country.emoji}</div>
          </div>
          <div className="grid grid-cols-3 bg-gray-50 px-4 py-2">
            <div className="text-sm text-gray-500">Currency</div>
            <div className="text-sm text-gray-900 col-psan-2">{data.country.currency}</div>
          </div>
          <div className="grid grid-cols-3 bg-gray-50 px-4 py-2">
            <div className="text-sm text-gray-500">Languages</div>
            <div className="text-sm text-gray-900 col-psan-2">{data.country.languages.map((l:any) => l.name).join(', ')}</div>
          </div>
        </div>
      )}


    </div>
  )
}

const CountryInfo2Settings = () => {
  const { actions: { setProp }, country } = useNode((node) => ({
    country: node.data.props.country
  }));
  return (
    <div>
      <Input placeholder="Country Code" value={country} onChange={(inputElement) => setProp((props:any) => props.country = inputElement.target.value)}  />
    </div>
  )
}

CountryInfo2.craft = {
  props: {
    country: 'US'
  },
  related: {
    settings: CountryInfo2Settings
  }

}

export  {
  CountryInfo2
}
