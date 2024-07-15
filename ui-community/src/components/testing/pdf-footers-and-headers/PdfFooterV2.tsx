import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';

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
      textAlign: "center"
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
        <Text style={styles.text}>This EIF must be completed and submitted to ECFMG by 18-Nov-2018</Text>
    </View>
  );
};
export default PdfFooterV2;
