import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
interface PdfHeaderProps {
  data: any;
}
const logoUrl =
  'https://staticstorageuniquename.blob.core.windows.net/public/Screenshot%202024-07-10%20at%2012.49.47%E2%80%AFPM.png?sp=r&st=2024-07-10T17:28:34Z&se=2024-07-31T01:28:34Z&spr=https&sv=2022-11-02&sr=b&sig=%2FtA%2FDnl%2Fz2%2BlLwpI6xQxWLkgmec6MFSJz%2BCnigj9bQM%3D';

export const PdfHeader: React.FC<PdfHeaderProps> = (props) => {
  const styles = StyleSheet.create({
    image: {
      width: '80%',
      paddingRight: '20px'
    },
    text: {
      fontSize: '12px',
      paddingBottom: '10px',
      fontWeight: 'ultrabold'
    },
    leftColumn: {
      flexDirection: 'row',
      paddingTop: 30,
      paddingRight: 20,
      paddingBottom: 10
    },
    title: {
      fontSize: '16px',
      fontWeight: 'ultrabold',
      paddingTop: '10px',
      paddingBottom: '10px'
    },
    row: {
      width: '100%'
    },
    bannertext: {
      fontSize: 12,
      fontWeight: 'ultrabold',
      backgroundColor: '#d3d3d3',
      marginBottom: '10px',
      padding: '2.5px'
    },
  });

  return (
    <View style={styles.leftColumn}>
      <Image style={styles.image} src={logoUrl} />
      <View style={styles.row}>
        <Text style={styles.text}>Final Medical Diploma</Text>
        <Text style={styles.title}>Verification Report</Text>
        <Text style={styles.bannertext}>Jane Sample Student</Text>
        <View>
          <Text style={styles.text}>Report Issued: 19 July, 2018</Text>
          <Text style={styles.text}>Issued To: Sample Regulatory Authority USA</Text>
          <Text style={styles.text}>Inclusions: &nbsp Verification Report; Verified Credential; Verification Form</Text>
        </View>
      </View>
    </View>
  );
};
export default PdfHeader;
