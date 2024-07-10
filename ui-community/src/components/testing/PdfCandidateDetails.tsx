import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
interface PdfCandidateDetailsProps {
  data: any;
}
const avatarUrl =
  'https://staticstorageuniquename.blob.core.windows.net/public/image%20(1).png?sp=r&st=2024-07-10T17:27:57Z&se=2024-07-31T01:27:57Z&spr=https&sv=2022-11-02&sr=b&sig=O0pFclYfrcVA5vwVFyLWzJX3II6gtM3ykciyJjlOLpY%3D';

export const PdfCandidateDetails: React.FC<PdfCandidateDetailsProps> = (props) => {
  const styles = StyleSheet.create({
    image: {
      width: '80%',
      paddingRight: '20px'
    },
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
    <>
      <View style={styles.leftColumn}>
        <View style={styles.row}>
          <Text style={styles.bannertext}>Candidate Details </Text>
          <View>
            <Text style={styles.text}>Last Name: Student</Text>
            <Text style={styles.text}>Rest of Name: Jane Sample</Text>
            <Text style={styles.text}>Date of Birth: 01 January 1980</Text>
            <Text style={styles.text}>Gender: Female</Text>
            <Text style={styles.text}>EPIC ID: C-SJ000003</Text>
          </View>
        </View>
        <View
          style={{
            width: '70%'
          }}
        >
          <Image style={styles.image} src={avatarUrl} />
          <Text style={styles.text}>Photo provided by candidate</Text>
        </View>
      </View>
    </>
  );
};
export default PdfCandidateDetails;
