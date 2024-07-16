import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface PdfHeaderProps {
  data: any;
}

export const PdfVerificationFooter: React.FC<PdfHeaderProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '7px',
      width: '100%',
      marginTop: 5,
      marginBottom: 5
    },
    box: {
      width: '90%',
      border: '1px solid black',
      padding: 2,
      marginLeft: 40,
      flexDirection: 'row'
    }
  });

  return (
    <View style={styles.box}>
      <Text style={[styles.text]}>Doc ID: 123411</Text>
      <Text style={[styles.text, { textAlign: 'center', fontFamily: "Libre Franklin Bold" }]}>
        This EIF must be completed and submitted to ECFMG by 18-Nov-2018
      </Text>
    </View>
  );
};
export default PdfVerificationFooter;
