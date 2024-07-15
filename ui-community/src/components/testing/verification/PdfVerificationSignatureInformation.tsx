import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
interface PdfCredentialDetailsProps {
  data: any;
}

export const PdfVerificationSignatureInformation: React.FC<PdfCredentialDetailsProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '8px'
    },
    leftColumn: {
      flexDirection: 'row',
      paddingRight: 20,
      paddingLeft: 20
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
          <Text style={styles.text}>Name on Document: &nbsp; {props.data.nameOnDocument}</Text>
          <Text style={styles.text}>Name of Record: &nbsp; {props.data.typeOfCredential}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Date of Birth: &nbsp; {props.data.dateOfBirth}</Text>
          <Text style={styles.text}>EPIC ID: &nbsp; {props.data.epicId}</Text>
        </View>
      </View>
    </>
  );
};
export default PdfVerificationSignatureInformation;
