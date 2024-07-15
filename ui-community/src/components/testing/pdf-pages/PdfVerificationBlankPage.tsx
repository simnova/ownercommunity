import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import FontFranklinRegular from '../../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-100.ttf';
import PdfHeaderV2 from '../pdf-footers-and-headers/PdfHeaderV2';
import PdfVerificationFooter from '../verification/PdfVerificationFooter';
import PdfVerificationSection from '../verification/PdfVerificationSection';


interface PdfTemplateProps {
  data: any;
}

Font.register({
  family: 'Libre Franklin',
  src: FontFranklinRegular,
  fontWeight: 1600
});

export const PdfVerificationBlankPage: React.FC<PdfTemplateProps> = (props) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Libre Franklin',
      color: 'black'
    }
  });

  return (
    <Document>
      <Page size={{ width: 11 * 72, height: 10 * 72 }} style={styles.page}>
        <PdfHeaderV2 data={null} />
        <PdfVerificationSection data={props.data}/>
        <PdfVerificationFooter data={null} />
      </Page>
    </Document>
  );
};
export default PdfVerificationBlankPage;
