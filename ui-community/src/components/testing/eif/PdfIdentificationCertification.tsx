import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
interface PdfDisclaimersProps {
  data: any;
}

export const PdfIdentificationCertification: React.FC<PdfDisclaimersProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '7px'
    },
    leftColumn: {
      flexDirection: 'row'
    },
    row: {
      width: '100%'
    },
    image: {
      width: '60%'
    },
    box: {
      width: '100%',
      border: '1px solid black',
      padding: 10,
      marginTop: 10
    },
    divider: {
      width: '45%',
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      padding: 0,
      color: '#00FFFF',
      marginRight: 10,
      marginTop: 5
    },
    underscore: {
      fontSize: 8,
      lineHeight: 1,
      marginLeft: -2,
      letterSpacing: -1
    }
  });

  const renderUnderscores = (count: number) => {
    return Array.from({ length: count }, (_, index) => (
      <Text key={index} style={styles.underscore}>
        {'\u005F'}
      </Text>
    ));
  };

  return (
    <View style={styles.box}>
      <Text style={[styles.text, { paddingBottom: 10 }]}>
        CERTIFICATION OF IDENTIFICATION BY OFFICIAL (To be completed by official){'\n'}I certify that on the date set
        forth below the individual named above did appear personally before me and that I did identify this applicant
        by: (a) comparing his/her physical appearence with the photograph printed here to, (b) comparing his/her
        physical appearence with the passport photograph, and (c) comparing his/her original passport with the copy of
        the attached passport.
      </Text>
      <Text style={[styles.text, { paddingBottom: 10 }]}>
        The statements in this document are subscribed and sworn to before me by the individual on this{' '}
        {renderUnderscores(4)} day, of the month of {renderUnderscores(14)} in the year {renderUnderscores(9)}.
      </Text>
      <View style={styles.leftColumn}>
        <Text style={styles.text}>X</Text>
        <Text style={styles.divider}></Text>
        <Text style={styles.divider}></Text>
      </View>
      <View style={styles.leftColumn}>
        <Text style={[styles.text, { marginRight: 95, marginLeft: 5 }]}>Signature of Official</Text>
        <Text style={styles.text}>Title (with English translation, if not in english)</Text>
      </View>
    </View>
  );
};
export default PdfIdentificationCertification;
