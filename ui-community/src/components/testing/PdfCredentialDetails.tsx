import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
interface PdfCredentialDetailsProps {
  data: any;
}

export const PdfCredentialDetails: React.FC<PdfCredentialDetailsProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '12px',
      paddingBottom: '10px',
      fontWeight: 'ultrabold'
    },
    leftColumn: {
      flexDirection: 'row',
      paddingTop: 30,
      paddingRight: 20,
      paddingBottom: 10,
      paddingLeft: 20
    },
    row: {
      width: '100%'
    },
    bannertext: {
      fontSize: 12,
      fontWeight: 'ultrabold',
      backgroundColor: '#d3d3d3',
      marginBottom: '10px',
      padding: '2.5px'
    }
  });

  return (
    <View style={styles.leftColumn}>
      <View style={styles.row}>
        <Text style={styles.bannertext}>Credential Details </Text>
        <View>
          <Text style={styles.text}>Name on Document: Jane Sample Student</Text>
          <Text style={styles.text}>Type of Credential: Final Medical Diploma </Text>
          <Text style={styles.text}>Status of Credential: VERIFIED</Text>
          <Text style={styles.text}>Medical School: ECFMG University School of Medicine</Text>
          <Text style={styles.text}>Medical School Location: Philadelphia, USA</Text>
        </View>
      </View>
    </View>
  );
};
export default PdfCredentialDetails;
