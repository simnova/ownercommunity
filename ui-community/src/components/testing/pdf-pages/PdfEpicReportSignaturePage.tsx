import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import FontFranklinRegular from '../../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-100.ttf';
import SignatureImage from '../test-images/SignatureImage.png';
import SealImage from '../test-images/SealImage.png';
import PdfSignatureArea from '../pdf-signature/PdfSignatureArea';
import PdfSignatureFooter from '../pdf-signature/PdfSignatureFooter';
import PdfSignatureInformation from '../pdf-signature/PdfSignatureInformation';
import PdfSignatureInstructions from '../pdf-signature/PdfSignatureInstructions';
import PdfSignatureReason from '../pdf-signature/PdfSignatureReason';
import PdfHeader from '../pdf-signature/PdfHeader';

interface PdfTemplateProps {
  data: any;
}

Font.register({
  family: 'Libre Franklin',
  src: FontFranklinRegular,
  fontWeight: 1600
});

export const PdfEpicReportSignaturePage: React.FC<PdfTemplateProps> = (props) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Libre Franklin',
      color: 'black'
    }
  });

  return (
    <Document>
      <Page style={styles.page}>
        <PdfHeader data={props.data} />
        <PdfSignatureInformation data={props.data} />
        <PdfSignatureInstructions data={props.data} />
        <PdfSignatureArea imageSource={SignatureImage} />
        <PdfSignatureReason />
        <PdfSignatureArea imageSource={SealImage} />
        <PdfSignatureFooter data={props.data} />
      </Page>
    </Document>
  );
};
export default PdfEpicReportSignaturePage;
