import React from 'react';
import pdfData from "./pdfRendererTest.json"
import PdfVerificationBlankPage from './pdf-pages/PdfVerificationBlankPage';

export const PdfTestingContainer: React.FC<any> = () => {
  return <PdfVerificationBlankPage data={pdfData} />;
};

export default PdfTestingContainer;
