import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import FontFranklinRegular from '../../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-500.ttf';
import FontFranklinBold from '../../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-700.ttf';
import PdfHeaderV2 from '../eif/PdfHeaderV2';
import PdfVerificationFooter from '../verification/PdfVerificationFooter';
import PdfVerificationSection from '../verification/PdfVerificationSection';

interface PdfTemplateProps {
  data: any;
}

Font.register({
  family: 'Libre Franklin',
  src: FontFranklinRegular
});

Font.register({
  family: 'Libre Franklin Bold',
  src: FontFranklinBold
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
        <PdfHeaderV2 data={props.data} />
        <PdfVerificationSection data={props.data} />
        <PdfVerificationFooter data={props.data} />
      </Page>
    </Document>
  );
};
export default PdfVerificationBlankPage;
