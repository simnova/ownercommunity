import React from 'react';
import { PdfTemplate } from './PdfTemplate';
import pdfData from "./pdfRendererTest.json"

export const PdfRendererContainer: React.FC<any> = () => {
  return <PdfTemplate data={pdfData} />;
};

export default PdfRendererContainer;
