import React from 'react';
import PdfRenderer from './PdfRenderer';
import pdfData from "./pdfRendererTest.json"

export const PdfRendererContainer: React.FC<any> = () => {
  return <PdfRenderer data={pdfData} />;
};

export default PdfRendererContainer;
