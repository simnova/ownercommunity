import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
interface PdfCandidateDetailsProps {
  data: any;
}

export const PdfCandidateDetails: React.FC<PdfCandidateDetailsProps> = (props) => {
  const styles = StyleSheet.create({
    image: {
      width: '100%'
    },
    text: {
      fontSize: '10px',
      paddingBottom: '10px',
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
          <Text style={styles.text}>Last Name: &nbsp; {props.data.lastName}</Text>
          <Text style={styles.text}>Rest of Name: &nbsp; {props.data.restOfName}</Text>
          <Text style={styles.text}>Generational Suffix: &nbsp; {props.data.generationalSuffix}</Text>
          <Text style={styles.text}>Date of Birth: &nbsp; {props.data.dateOfBirth}</Text>
          <Text style={styles.text}>Gender: &nbsp; {props.data.gender}</Text>
          <Text style={styles.text}>EPIC ID: &nbsp; {props.data.epicId}</Text>
        </View>
      </View>
      <View
        style={{
          width: '70%'
        }}
      >
        <Image style={styles.image} src={props.data.applicantPhoto} />
        <Text style={styles.text}>Photo provided by candidate</Text>
      </View>
    </View>
  );
};
