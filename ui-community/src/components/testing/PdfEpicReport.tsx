import React from 'react';
import { Document, Page, Text, StyleSheet, View, Font } from '@react-pdf/renderer';
import PdfHeader from './PdfHeader';
import PdfCandidateDetails from './PdfCandidateDetails';
import PdfCredentialDetails from './PdfCredentialDetails';
import PdfDisclaimers from './PdfDisclaimers';
interface PdfTemplateProps {
  data: any;
}

// Font.register({ family: 'Poppins', src: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" });

export const PdfEpicReport: React.FC<PdfTemplateProps> = (props) => {
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
        <PdfHeader data={props.data} />
        <Text style={styles.divider}></Text>
        <PdfCandidateDetails data={props.data} />
        <PdfCredentialDetails data={props.data} />
        <PdfDisclaimers data={props.data} />
      </Page>
      <Page>

        </Page>
    </Document>
  );
};
export default PdfEpicReport;
