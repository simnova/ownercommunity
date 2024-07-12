import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import SignatureImage from '../test-images/SignatureImage.png';
import SealImage from '../test-images/SealImage.png';
import PdfSignatureArea from './PdfSignatureArea';

interface PdfCredentialDetailsProps {
  data: any;
}

export const PdfSignatureSection: React.FC<PdfCredentialDetailsProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '8px'
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
    title: {
      fontSize: '8px',
      paddingRight: 20,
      paddingLeft: 20,
      paddingTop: 10
    }
  });

  return (
    <>
      <PdfSignatureArea imageSource={SignatureImage} />
      <Text style={styles.title}>
        I cannot certify that the attached document is authentic and correct because (attach additional sheet(s) if
        necessary):
      </Text>
      <Text style={styles.divider}></Text>
      <Text style={styles.divider}></Text>
      <Text style={[styles.divider, { marginBottom: '15px' }]}></Text>
      <PdfSignatureArea imageSource={SealImage} />
      <Text style={[styles.text, { textAlign: 'center', paddingTop: 25 }]}>
        Contact ECFMG at deansbox@ecfmg.org if you have any questions about this verification form.
      </Text>
      <Text style={[styles.text, { marginTop: 80, marginLeft: 10 }]}>RequestID {props.data.requestId}</Text>
    </>
  );
};
export default PdfSignatureSection;
