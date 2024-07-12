import React from 'react';
import { Document, Page, Text, StyleSheet, Font } from '@react-pdf/renderer';
import PdfTitleSection from './PdfTitleSection';
import PdfCandidateDetails from './PdfCandidateDetails';
import PdfCredentialDetails from './PdfCredentialDetails';
import PdfDisclaimers from './PdfDisclaimers';
import FontFranklinRegular from '../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-100.ttf';
import PoppinsRegular from '..//../fonts/poppins-v19-latin/poppins-v19-latin-100.ttf';
import PdfHeader from './PdfHeader';
import PdfSignatureInformation from './pdf-signature/PdfSignatureInformation';
import PdfSignatureInstructions from './pdf-signature/PdfSignatureInstructions';
import PdfSignatureSection from './pdf-signature/PdfSignatureSection';
interface PdfTemplateProps {
  data: any;
}

Font.register({
  family: 'Libre Franklin',
  src: FontFranklinRegular,
  fontWeight: 1600
});

Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: PoppinsRegular,
      fontWeight: 800
    }
  ]
});

export const PdfEpicReport: React.FC<PdfTemplateProps> = (props) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Libre Franklin',
      color: 'black'
    },
    divider: {
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      margin: '1em 0',
      padding: 0,
      color: '#00FFFF',
      marginLeft: 20,
      marginRight: 20
    }
  });

  return (
    <Document>
      <Page style={styles.page}>
        <PdfTitleSection data={props.data} />
        <Text style={styles.divider}></Text>
        <PdfCandidateDetails data={props.data} />
        <PdfCredentialDetails data={props.data} />
        <PdfDisclaimers data={props.data} />
      </Page>
      <Page style={styles.page}>
        <PdfHeader data={props.data} />
        <PdfSignatureInformation data={props.data} />
        <PdfSignatureInstructions data={props.data} />
        <PdfSignatureSection data={props.data} />
      </Page>
    </Document>
  );
};
export default PdfEpicReport;
