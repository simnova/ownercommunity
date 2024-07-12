import React from 'react';
import { Document, Page, Text, StyleSheet, Font } from '@react-pdf/renderer';
import FontFranklinRegular from '../../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-100.ttf';
import PdfCandidateDetails from '../PdfCandidateDetails';
import PdfCredentialDetails from '../PdfCredentialDetails';
import PdfDisclaimers from '../PdfDisclaimers';
import PdfTitleSection from '../PdfTitleSection';

interface PdfTemplateProps {
  data: any;
}

Font.register({
  family: 'Libre Franklin',
  src: FontFranklinRegular,
  fontWeight: 1600
});

export const PdfEpicReportInfoPage: React.FC<PdfTemplateProps> = (props) => {
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
    </Document>
  );
};
export default PdfEpicReportInfoPage;
