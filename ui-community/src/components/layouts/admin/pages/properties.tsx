import { Route, Routes } from 'react-router-dom';
import { PropertiesList } from './properties-list';
import { PropertiesAdd } from './properties-add';
import { PropertiesDetail } from './properties-detail';
import { Helmet } from 'react-helmet-async';

export const Properties: React.FC<any> = () => {
  return (
    <>
    <Helmet>
        <title>Properties</title>
        {/* Add any other meta tags you need */}
      </Helmet>
    <Routes>
      <Route path="" element={<PropertiesList />} />
      <Route path="/new" element={<PropertiesAdd />} />
      <Route path="/:id/*" element={<PropertiesDetail />} />
    </Routes>
    </>
  )
}