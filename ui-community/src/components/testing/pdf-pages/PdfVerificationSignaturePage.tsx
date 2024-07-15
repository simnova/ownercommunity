import React from 'react';
import { Document, Page, StyleSheet, Font } from '@react-pdf/renderer';
import FontFranklinRegular from '../../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-100.ttf';
import SealImage from '../test-images/SealImage.png';
import PdfSignatureArea from '../pdf-signature/PdfSignatureArea';
import PdfSignatureInstructions from '../pdf-signature/PdfSignatureInstructions';
import PdfSignatureReason from '../pdf-signature/PdfSignatureReason';
import PdfHeader from '../pdf-footers-and-headers/PdfHeader';
import PdfVerificationSignatureFooter from '../verification/PdfVerificationSignatureFooter';
import PdfVerificationSignatureInformation from '../verification/PdfVerificationSignatureInformation';

interface PdfTemplateProps {
  data: any;
}

Font.register({
  family: 'Libre Franklin',
  src: FontFranklinRegular,
  fontWeight: 1600
});

export const PdfVerificationSignaturePage: React.FC<PdfTemplateProps> = (props) => {
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
        <PdfVerificationSignatureInformation data={props.data} />
        <PdfSignatureInstructions data={props.data} />
        <PdfSignatureArea imageSource={SealImage} />
        <PdfSignatureReason />
        <PdfSignatureArea imageSource={SealImage} />
        <PdfVerificationSignatureFooter data={props.data} />
      </Page>
    </Document>
  );
};
export default PdfVerificationSignaturePage;
