import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
interface PdfDisclaimersProps {
  data: any;
}

export const PdfDisclaimers: React.FC<PdfDisclaimersProps> = (props) => {
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
        <Text style={styles.bannertext}>Candidate Details </Text>
        <View>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Text>
        </View>
      </View>
    </View>
  );
};
export default PdfDisclaimers;
