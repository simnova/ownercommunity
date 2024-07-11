import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
interface PdfCredentialDetailsProps {
  data: any;
}

export const PdfCredentialDetails: React.FC<PdfCredentialDetailsProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '10px',
      paddingBottom: '10px',
    },
    leftColumn: {
      flexDirection: 'row',
      paddingTop: 30,
      paddingRight: 20,
      paddingBottom: 10,
      paddingLeft: 20
    },
    row: {
      width: '100%'
    },
    bannertext: {
      fontSize: 12,
      backgroundColor: '#d3d3d3',
      marginBottom: '10px',
      padding: '2.5px'
    }
  });

  return (
    <View style={styles.leftColumn}>
      <View style={styles.row}>
        <Text style={styles.bannertext}>Credential Details </Text>
        <View>
          <Text style={styles.text}>Name on Document: &nbsp; {props.data.nameOnDocument}</Text>
          <Text style={styles.text}>Type of Credential: &nbsp; {props.data.typeOfCredential}</Text>
          <Text style={styles.text}>Status of Credential: &nbsp; {props.data.statusOfCredential}</Text>
          <Text style={styles.text}>Medical School: &nbsp; {props.data.medicalSchool}</Text>
          <Text style={styles.text}>Medical School Location: &nbsp; {props.data.schoolLocation}</Text>
        </View>
      </View>
    </View>
  );
};
export default PdfCredentialDetails;
