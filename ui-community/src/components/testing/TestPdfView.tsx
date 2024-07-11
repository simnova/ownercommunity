import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import PdfEpicReportContainer from './PdfEpicReport.container';
import { PDFViewer, pdf } from '@react-pdf/renderer';

export const TestPdfView: React.FC<any> = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const downloadPdf = async () => {
    const blob = await pdf(<PdfEpicReportContainer />).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = 'document.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open Pdf Modal
      </Button>
      <Modal
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            downloadPdf();
          }}
        >
          Download pdf
        </Button>
        <PDFViewer>
          <PdfEpicReportContainer />
        </PDFViewer>
      </Modal>
    </>
  );
};

export default TestPdfView;