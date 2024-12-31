import React from 'react';
import { View, StyleSheet, Image } from '@react-pdf/renderer';
import { PdfInformation } from './PdfEifInformation';
import { PdfIdentificationCertification } from './PdfIdentificationCertification';
import { PdfApplicantCertification } from './PdfApplicantCertification';
import SideBarImage from '../test-images/SideBarImage.png';

interface PdfDisclaimersProps {
  data: any;
}

export const PdfEIFSectionFinal: React.FC<PdfDisclaimersProps> = (props) => {
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
        <PdfInformation data={props.data} />
        <PdfIdentificationCertification data={null} />
        <PdfApplicantCertification data={null} />
      </View>
      <Image style={styles.image} src={SideBarImage} />
    </View>
  );
};
export default PdfEIFSectionFinal;
