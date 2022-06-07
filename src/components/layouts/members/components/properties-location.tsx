import React from 'react';

export const PropertiesLocation = (props: any) => {
  console.log(props);
  return (
    <div>
      <h1>Properties Location goes here</h1>
      <h2>{JSON.stringify(props)}</h2>
    </div>
  )
}