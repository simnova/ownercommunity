import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';

interface PdfHeaderProps {
  data: any;
}

export const PdfHeaderV2: React.FC<PdfHeaderProps> = (props) => {
  const styles = StyleSheet.create({
    image: {
      width: '30%',
      paddingRight: 10
    },
    text: {
      fontSize: '9px',
      width: '100%',
      textAlign: 'center',
      fontFamily: 'Libre Franklin Bold'
    },
    leftColumn: {
      flexDirection: 'row',
      paddingTop: 10
    },
    row: {
      width: '100%',
      paddingTop: 10
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
      <View style={styles.row}>
        <View>
          <Text style={styles.text}>{props.data.formTitle}</Text>
          <Text style={styles.text}>Educational Comission for Foreign Medical Graduates ECFMG© </Text>
          <Text style={styles.text}>{props.data.formSubTitle}</Text>
        </View>
      </View>
      <Text style={styles.divider}></Text>
    </>
  );
};
export default PdfHeaderV2;
