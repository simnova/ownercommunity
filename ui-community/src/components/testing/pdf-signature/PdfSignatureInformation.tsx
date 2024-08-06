import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
interface PdfCredentialDetailsProps {
  data: any;
}

export const PdfSignatureInformation: React.FC<PdfCredentialDetailsProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '8px',
      fontFamily: 'Libre Franklin Bold'
    },
    subText: {
      fontSize: '8px'
    },
    leftColumn: {
      flexDirection: 'row',
      paddingRight: 20,
      paddingLeft: 20
    },
    label: {
      flexDirection: 'row'
    },
    row: {
      width: '100%'
    }
  });

  return (
    <>
      <Text
        style={{
          fontSize: '8px',
          marginLeft: '420px',
          paddingBottom: '5px'
        }}
      >
        12 December 2016
      </Text>
      <View style={styles.leftColumn}>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.text}>Name on Document: &nbsp; </Text>
            <Text style={styles.subText}>{props.data.nameOnDocument}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.text}>Name of Record: &nbsp; </Text>
            <Text style={styles.subText}>{props.data.typeOfCredential}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.text}>Date of Birth: &nbsp; </Text>
            <Text style={styles.subText}>{props.data.dateOfBirth}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.text}>Applicant ID: &nbsp; </Text>
            <Text style={styles.subText}>{props.data.epicId}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
export default PdfSignatureInformation;
