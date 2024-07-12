import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import FontFranklinRegular from '../../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-100.ttf';
import PdfBarCodeHeader from '../PdfBarCodeHeader';
import PdfEIFSection from '../eif/PdfEIFSection';
import PdfBarCodeFooter from '../PdfBarCodeFooter';

interface PdfTemplateProps {
  data: any;
}

Font.register({
  family: 'Libre Franklin',
  src: FontFranklinRegular,
  fontWeight: 1600
});

export const PdfEIFBlankPage: React.FC<PdfTemplateProps> = (props) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Libre Franklin',
      color: 'black'
    }
  });

  return (
    <Document>
      <Page size={{ width: 11 * 72, height: 10 * 72 }} style={styles.page}>
        <PdfBarCodeHeader data={null} />
        <PdfEIFSection data={props.data} />
        <PdfBarCodeFooter data={null} />
      </Page>
    </Document>
  );
};
export default PdfEIFBlankPage;
