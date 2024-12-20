import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
interface PdfDisclaimersProps {
  data: any;
}

export const PdfInformation: React.FC<PdfDisclaimersProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '7px',
      fontFamily: 'Libre Franklin Bold'
    },
    subText: {
      fontSize: '7px'
    },
    leftColumn: {
      flexDirection: 'row',
      paddingRight: 20,
      paddingLeft: 10,
      paddingTop: 10
    },
    row: {
      width: '100%'
    },
    label: {
      flexDirection: 'row'
    }
  });

  return (
    <>
      <View style={styles.leftColumn}>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.text}>Name: &nbsp; </Text>
            <Text style={styles.subText}>{props.data.nameOnDocument}</Text>
          </View>
          <View style={styles.label}>
            <Text style={styles.text}>Date of Birth: &nbsp; </Text>
            <Text style={styles.subText}>{props.data.dateOfBirth}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.label}>
            <Text style={styles.text}>Gender: &nbsp; </Text>
            <Text style={styles.subText}>{props.data.gender}</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.text, { paddingTop: 10, paddingLeft: 10 }]}>IMPORTANT NOTE:</Text>
      <Text style={[styles.subText, { paddingLeft: 10 }]}>
        When completed and submitted to ECFMG and this EPIC Identification Form will become part of your ECFMG record.
        All information on the EPIC Identification Form is subject to verification and acceptance to ECFMG.
      </Text>
    </>
  );
};
