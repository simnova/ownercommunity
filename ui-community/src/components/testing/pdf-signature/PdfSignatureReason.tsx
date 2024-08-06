import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';

interface PdfCredentialDetailsProps {}

export const PdfSignatureReason: React.FC<PdfCredentialDetailsProps> = (props) => {
  const styles = StyleSheet.create({
    title: {
      textDecoration: 'underline',
      fontSize: '8px',
      paddingRight: 20,
      paddingLeft: 20,
      paddingTop: 10,
      fontFamily: "Libre Franklin Bold"
    },
    divider: {
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      padding: 0,
      color: '#00FFFF',
      marginLeft: 20,
      marginRight: 20,
      marginTop: 20
    }
  });

  return (
    <>
      <Text style={styles.title}>
        I cannot certify that the attached document is authentic and correct because (attach additional sheet(s) if
        necessary):
      </Text>
      <Text style={styles.divider}></Text>
      <Text style={styles.divider}></Text>
      <Text style={[styles.divider, { marginBottom: '15px' }]}></Text>
    </>
  );
};

export default PdfSignatureReason;
