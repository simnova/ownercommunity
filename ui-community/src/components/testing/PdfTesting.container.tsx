import React from 'react';
import pdfData from "./pdfRendererTest.json"
import PdfEpicReportInfoPage from './pdf-pages/PdfEpicReportInfoPage';

export const PdfTestingContainer: React.FC<any> = () => {
  return <PdfEpicReportInfoPage data={pdfData} />;
};

export default PdfTestingContainer;
