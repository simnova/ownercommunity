import React from 'react';
import { Document, Page, View, Text, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  text: {
    fontSize: 10
  }
});
interface PdfRendererProps {
  data: any
}
export const PdfRenderer: React.FC<PdfRendererProps> = (props) => {
  return (
    <PDFViewer>
      <Document>
        <Page size="A5">
          <Text style={styles.text}>Test</Text>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default PdfRenderer;
