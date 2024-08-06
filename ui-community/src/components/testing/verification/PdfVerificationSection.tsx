import React from 'react';
import { View, StyleSheet, Image } from '@react-pdf/renderer';
import SideBarImage from '../test-images/SideBarImage.png';
import PdfApplicantCertification from '../eif/PdfApplicantCertification';
import PdfIdentificationCertification from '../eif/PdfIdentificationCertification';
import PdfVerificationInformation from './PdfVerificationInformation';

interface PdfDisclaimersProps {
  data: any;
}

export const PdfVerificationSection: React.FC<PdfDisclaimersProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '7px'
    },
    leftColumn: {
      flexDirection: 'row',
      paddingRight: 20,
      paddingLeft: 20,
      width: "100%"
    },
    row: {
      width: '100%'
    },
    image: {
      width: '70%',
    }
  });

  return (
    <View style={styles.leftColumn}>
      <View style={styles.row}>
        <PdfVerificationInformation data={props.data} />
        <PdfIdentificationCertification data={null} />
        <PdfApplicantCertification data={null} />
      </View>
      <Image style={styles.image} src={SideBarImage} />
    </View>
  );
};
export default PdfVerificationSection;
