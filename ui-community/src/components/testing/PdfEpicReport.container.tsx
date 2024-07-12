import React from 'react';
import pdfData from "./pdfRendererTest.json"
import PdfEpicReportSignaturePage from './pdf-pages/PdfEpicReportSignaturePage';

export const PdfEpicReportContainer: React.FC<any> = () => {
  return <PdfEpicReportSignaturePage data={pdfData} />;
};

export default PdfEpicReportContainer;
