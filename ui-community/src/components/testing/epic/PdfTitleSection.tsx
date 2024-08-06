import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';

interface PdfHeaderProps {
  data: any;
}
const logoUrl =
  'https://staticstorageuniquename.blob.core.windows.net/public/Screenshot%202024-07-10%20at%2012.49.47%E2%80%AFPM.png?sp=r&st=2024-07-10T17:28:34Z&se=2024-07-31T01:28:34Z&spr=https&sv=2022-11-02&sr=b&sig=%2FtA%2FDnl%2Fz2%2BlLwpI6xQxWLkgmec6MFSJz%2BCnigj9bQM%3D';

export const PdfTitleSection: React.FC<PdfHeaderProps> = (props) => {
  const styles = StyleSheet.create({
    image: {
      width: '80%',
      paddingRight: '20px'
    },
    text: {
      fontSize: '10px',
      paddingBottom: '10px'
    },
    leftColumn: {
      flexDirection: 'row',
      paddingTop: 30,
      paddingRight: 20,
      paddingBottom: 10
    },
    title: {
      fontSize: '12px',
      paddingTop: '10px',
      paddingBottom: '10px'
    },
    row: {
      width: '100%'
    },
    bannertext: {
      fontSize: '10px',
      backgroundColor: '#d3d3d3',
      marginBottom: '10px',
      padding: '2.5px'
    }
  });

  return (
    <View style={styles.leftColumn}>
      <Image style={styles.image} src={logoUrl} />
      <View style={styles.row}>
        <Text
          style={{
            fontSize: '12px'
          }}
        >
          {props.data.documentTitle}
        </Text>
        <Text style={[styles.title, { fontFamily: 'Libre Franklin Bold' }]}>VERIFICATION REPORT</Text>
        <Text style={[styles.bannertext, { fontFamily: 'Libre Franklin Bold' }]}>{props.data.nameOnDocument}</Text>
        <View>
          <Text style={styles.text}>Report Issued: &nbsp; {props.data.reportIssued}</Text>
          <Text style={styles.text}>Issued To: &nbsp; {props.data.issuedOn}</Text>
          <Text style={styles.text}>Inclusions: &nbsp; {props.data.inclusions}</Text>
        </View>
      </View>
    </View>
  );
};
export default PdfTitleSection;
