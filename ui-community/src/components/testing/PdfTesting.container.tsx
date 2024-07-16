import React from 'react';
import pdfData from "./pdfRendererTest.json"
import PdfEIFBlankPageV2 from './pdf-pages/PdfEIFBlankPageV2';

export const PdfTestingContainer: React.FC<any> = () => {
  return <PdfEIFBlankPageV2 data={pdfData} />;
};

export default PdfTestingContainer;
