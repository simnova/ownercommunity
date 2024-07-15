import React from 'react';
import pdfData from "./pdfRendererTest.json"
import PdfVerificationSignaturePage from './pdf-pages/PdfVerificationSignaturePage';

export const PdfTestingContainer: React.FC<any> = () => {
  return <PdfVerificationSignaturePage data={pdfData} />;
};

export default PdfTestingContainer;
