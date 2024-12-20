import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface PdfHeaderProps {
  data: any;
}

export const PdfFooterV2: React.FC<PdfHeaderProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '7px',
      width: '100%',
      marginTop: 5,
      marginBottom: 5,
      textAlign: 'center',
      fontFamily: 'Libre Franklin Bold'
    },
    box: {
      width: '90%',
      border: '1px solid black',
      padding: 2,
      marginLeft: 40
    }
  });

  return (
    <View style={styles.box}>
      <Text style={styles.text}>This EIF must be completed and submitted to ECFMG by {props.data.submissionDate}</Text>
    </View>
  );
};
