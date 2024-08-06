import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
interface PdfCredentialDetailsProps {
  data: any;
}

export const PdfSignatureInstructions: React.FC<PdfCredentialDetailsProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '8px',
      paddingRight: 20,
      paddingLeft: 20,
      paddingBottom: 10
    },
    leftColumn: {
      flexDirection: 'row',
      paddingRight: 20,
      paddingLeft: 20
    },
    row: {
      width: '100%'
    },
    title: {
      textDecoration: 'underline',
      fontSize: '8px',
      paddingRight: 20,
      paddingLeft: 20,
      paddingTop: 10,
      fontFamily: "Libre Franklin Bold"
    }
  });

  return (
    <View>
      <Text style={styles.title}>INSTRUCTIONS</Text>
      <Text style={styles.text}>
        This individual identified on this verification form has authorized ECFMG to contact your institution to request
        verification of the authenticity of the attached credential(s). Please complete this verification form and
        return the original, completed form and attached credential(s) directly to ECFMG. A pre-paid reply envelope is
        enclosed for your convenience.
      </Text>
      <Text style={[styles.text, {fontFamily: "Libre Franklin Bold"}]}>
        I hereby certify that the attached credential is authentic and correct as of the date of its issuance, and that
        I am authorized to certify this on behalf of this institution.
      </Text>
    </View>
  );
};
export default PdfSignatureInstructions;
