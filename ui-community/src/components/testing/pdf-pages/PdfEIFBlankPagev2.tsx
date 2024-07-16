import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import FontFranklinRegular from '../../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-500.ttf';
import FontFranklinBold from '../../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-700.ttf'
import PdfEIFSection from '../eif/PdfEIFSection';
import PdfFooterV2 from '../pdf-footers-and-headers/PdfFooterV2';
import PdfHeaderV2 from '../pdf-footers-and-headers/PdfHeaderV2';

interface PdfTemplateProps {
  data: any;
}

Font.register({
  family: 'Libre Franklin',
  src: FontFranklinRegular,
});

Font.register({
  family: 'Libre Franklin Bold',
  src: FontFranklinBold,
});

export const PdfEIFBlankPageV2: React.FC<PdfTemplateProps> = (props) => {
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
        <PdfEIFSection data={props.data} />
        <PdfFooterV2 data={null} />
      </Page>
    </Document>
  );
};
export default PdfEIFBlankPageV2;
