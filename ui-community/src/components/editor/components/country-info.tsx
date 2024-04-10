import { useNode } from "@craftjs/core";
import { Button, Input } from 'antd';
import { gql, useLazyQuery } from '@apollo/client';
import { useState } from "react";


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


export const CountryInfo = () => {
  const { connectors: { connect, drag } } = useNode();
  const [country, setCountry] = useState('');
  
  const [loadCountry, { called, loading, data, error }] = useLazyQuery(
    GET_COUNTRY_DETAILS,
    { variables: { country: country},context: { clientName: 'country' } },    
  );

  if (called && loading) return <>Loading...</>;

  if (error) return <>Error! ${error.message}</>;

  return (
    <div 
      ref={dom => connect(drag(dom as HTMLDivElement))} 
      style={{ padding:'20px'}}>

      Get Country Info! Nice eh?

      <Input placeholder="Country Code" value={country} onChange={(inputElement) => setCountry(inputElement.target.value)}  />
      <Button type="primary" onClick={() => loadCountry({})} >Get Info</Button>
      {called && data && (
        <div>
          <h2>{data.country.name}</h2>
          <h3>{data.country.native}</h3>
          <h3>{data.country.capital}</h3>
          <h3>{data.country.emoji}</h3>
          <h3>{data.country.currency}</h3>
          <h3>{data.country.languages.map((l:any) => l.name).join(', ')}</h3>
        </div>
      )}


    </div>
  )
}

