import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import BarCodeFooter from '../test-images/BarCodeFooter.png';

interface PdfHeaderProps {
  data: any;
}

export const PdfBarCodeFooter: React.FC<PdfHeaderProps> = () => {
  const styles = StyleSheet.create({
    image: {
      width: '50%',
      paddingRight: 10
    },
    text: {
      fontSize: '7px',
      width: '100%',
      marginTop: 5,
      marginBottom: 5,
    },
    leftColumn: {
      flexDirection: 'row',
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
      <View style={styles.leftColumn}>
        <Text style={styles.text}>This EIF must be completed and submitted to ECFMG by 18-Nov-2018</Text>
        <Image style={styles.image} src={BarCodeFooter} />
      </View>
    </View>
  );
};
export default PdfBarCodeFooter;
