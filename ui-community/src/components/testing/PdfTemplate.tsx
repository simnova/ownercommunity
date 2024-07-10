import React from 'react';
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import PdfHeader from './PdfHeader';
import PdfCandidateDetails from './PdfCandidateDetails';
import PdfCredentialDetails from './PdfCredentialDetails';
import PdfDisclaimers from './PdfDisclaimers';
interface PdfTemplateProps {
  data: any;
}

export const PdfTemplate: React.FC<PdfTemplateProps> = (props) => {
  const styles = StyleSheet.create({
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
      <Page>
        <PdfHeader data={null} />
        <Text style={styles.divider}></Text>
        <PdfCandidateDetails data={null} />
        <PdfCredentialDetails data={null} />
        <PdfDisclaimers data={null} />
      </Page>
    </Document>
  );
};
export default PdfTemplate;

{
  /* <Image style={styles.image} src={`https://ui-avatars.com/api/?name=JasonMorais`}/> */
}
