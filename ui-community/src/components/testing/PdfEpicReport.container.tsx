import React from 'react';
import pdfData from "./pdfRendererTest.json"
import PdfEpicReportSignaturePage from './pdf-pages/PdfEpicReportSignaturePage';
import PdfEIFBlankPage from './pdf-pages/PdfEIFBlankPage';

export const PdfEpicReportContainer: React.FC<any> = () => {
  return <PdfEIFBlankPage data={pdfData} />;
};

export default PdfEpicReportContainer;
