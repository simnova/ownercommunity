import React from 'react';
import pdfData from "./pdfRendererTest.json"
import PdfEIFBlankPageV2 from './pdf-pages/PdfEIFBlankPagev2';

export const PdfEpicReportContainer: React.FC<any> = () => {
  return <PdfEIFBlankPageV2 data={pdfData} />;
};

export default PdfEpicReportContainer;
