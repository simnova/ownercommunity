import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import HeaderImage from '../test-images/HeaderImage.png';
interface PdfHeaderProps {
  data: any;
}

export const PdfHeader: React.FC<PdfHeaderProps> = () => {
  const styles = StyleSheet.create({
    image: {
      width: '60%',
      paddingRight: '20px'
    },
    text: {
      fontSize: '8px',
      paddingBottom: '10px',
      flexWrap: 'wrap',
      width: '50%'
    },
    leftColumn: {
      flexDirection: 'row',
      paddingTop: 30,
      paddingRight: 20,
      paddingBottom: 10
    },
    row: {
      width: '100%',
      flexDirection: 'row'
    },
    bannertext: {
      fontSize: 12,
      backgroundColor: '#d3d3d3',
      marginBottom: '10px',
      padding: '2.5px'
    },
    verticalDivider: {
      borderLeft: '1px solid #38546d',
      height: '80px',
      paddingRight: '10px',
      width: '1px'
    }
  });

  return (
    <View style={styles.leftColumn}>
      <Image style={styles.image} src={HeaderImage} />
      <View style={styles.row}>
        <Text style={styles.verticalDivider}></Text>
        <Text style={styles.text}>EDUCATIONAL COMMISSION FOR FOREIGN MEDICAL GRADUATES</Text>
        <Text style={styles.verticalDivider}></Text>
        <View>
          <Text style={styles.text}>3624 Market Street</Text>
          <Text style={styles.text}>Philadelphia PA 19104-2685 USA</Text>
          <Text style={styles.text}>215-386-5900 | 215-386-9767 Fax</Text>
          <Text style={styles.text}>www.ecfmg.org</Text>
        </View>
      </View>
    </View>
  );
};
