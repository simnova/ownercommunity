import React from 'react';
import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';
interface PdfDisclaimersProps {
  data: any;
}

export const PdfDisclaimers: React.FC<PdfDisclaimersProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '10px',
    },
    leftColumn: {
      flexDirection: 'row',
      paddingRight: 20,
      paddingLeft: 20
    },
    row: {
      width: '100%'
    },
    bannertext: {
      fontSize: 10,
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
            This report is intended only for the report recipient (the entity to which the report is issued). Any
            reproduction, transfer, distribution, or other dissemination for use other than by the report recipient is
            strictly prohibited and could result in legal action.
            {'\n'} {'\n'}
            This report is valid only if obtained by the report recipient through the EPIC Report Portal. ECFMG makes no
            claims about the authenticity of any Verification Report not obtained by the report recipient through the
            EPIC Report Portal. The use of the term "VERIFIED" indicates that ECFMG has authenticated a physician's
            credential as indicated in this report through ECFMG's primary source verification process. This includes
            the authentication of the credential by the issuing authority, which ECFMG does not control. ECFMG does not
            guarauntee, certify, or assure that such verification is accurate. ECFMG makes no reccomendation or
            endorsements of physicians.
            {'\n'} {'\n'}
            If the credential was submitted to ECFMG in a language other than English, the physician was required to
            include a certified English translation of the document. That translation, if applicable, is included for
            your reference. ECFMG does not verify the content of the translation and makes no endorsement of the agency
            or company that prepared the translation.
            {'\n'} {'\n'}
            For more information on EPIC, please visit www.ecfmgepic.org.
          </Text>
        </View>
      </View>
    </View>
  );
};
export default PdfDisclaimers;
