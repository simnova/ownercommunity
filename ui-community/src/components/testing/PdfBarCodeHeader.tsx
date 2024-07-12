import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import BarCode from './test-images/BarCodeSmall.png';

interface PdfHeaderProps {
  data: any;
}

export const PdfBarCodeHeader: React.FC<PdfHeaderProps> = (props) => {
  const styles = StyleSheet.create({
    image: {
      width: '30%',
      paddingRight: 10
    },
    text: {
      fontSize: '7px',
      width: '100%',
      paddingLeft: 120,
      textAlign: 'center'
    },
    leftColumn: {
      flexDirection: 'row',
      paddingTop: 10
    },
    row: {
      width: '100%'
    },
    divider: {
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      margin: '1em 0',
      color: '#00FFFF',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10
    }
  });

  return (
    <>
      <View style={styles.leftColumn}>
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>
              Electronic Portfolio of International Credentials (EPIC) IDENTIFICATION FORM
            </Text>
            <Text style={styles.text}>Educational Comission for Foreign Medical Graduates ECFMG© </Text>
            <Text style={styles.text}>3624 Market Street, Philadelphia, PA 19104 (215) 966-3900 info@ecfmgpic.org</Text>
          </View>
        </View>
        <Image style={styles.image} src={BarCode} />
      </View>
      <Text style={styles.divider}></Text>
    </>
  );
};
export default PdfBarCodeHeader;
