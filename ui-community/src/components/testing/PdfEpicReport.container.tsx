import React from 'react';
import { PdfEpicReport } from './PdfEpicReport';
import pdfData from "./pdfRendererTest.json"

export const PdfEpicReportContainer: React.FC<any> = () => {
  return <PdfEpicReport data={pdfData} />;
};

export default PdfEpicReportContainer;
