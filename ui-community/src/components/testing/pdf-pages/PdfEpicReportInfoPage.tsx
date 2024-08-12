import React from 'react';
import { Document, Page, Text, StyleSheet, Font } from '@react-pdf/renderer';
import FontFranklinRegular from '../../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-200.ttf';
import FontFranklinBold from '../../../fonts/libre-franklin-v11-latin/libre-franklin-v11-latin-600.ttf'
import PdfCandidateDetails from '../epic/PdfCandidateDetails';
import PdfCredentialDetails from '../epic/PdfCredentialDetails';
import PdfDisclaimers from '../epic/PdfDisclaimers';
import PdfTitleSection from '../epic/PdfTitleSection';

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

export const PdfEpicReportInfoPage: React.FC<PdfTemplateProps> = (props) => {
  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Libre Franklin Bold',
      color: 'black'
    },
    divider: {
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
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
