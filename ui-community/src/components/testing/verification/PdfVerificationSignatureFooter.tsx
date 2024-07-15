import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

interface PdfCredentialDetailsProps {
  data: any
}

export const PdfVerificationSignatureFooter: React.FC<PdfCredentialDetailsProps> = (props) => {
  const styles = StyleSheet.create({
    title: {
      textDecoration: 'underline',
      fontSize: '8px',
      paddingRight: 20,
      paddingLeft: 20,
      paddingTop: 10
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
    },
    text: {
      fontSize: '8px'
    },
  });

  return (
    <>
      <Text style={[styles.text, { textAlign: 'center', paddingTop: 25 }]}>
        Contact ECFMG at deansbox@ecfmg.org if you have any questions about this verification form.
      </Text>
      <Text style={[styles.text, { marginTop: 80, marginLeft: 10 }]}>ECFMG Verification Request ID {props.data.requestId}</Text>
    </>
  );
};

export default PdfVerificationSignatureFooter;
