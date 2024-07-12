import React from 'react';
import { View, StyleSheet, Text } from '@react-pdf/renderer';
interface PdfDisclaimersProps {
  data: any;
}

export const PdfApplicantCertification: React.FC<PdfDisclaimersProps> = (props) => {
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
    }
  });

  return (
    <View style={styles.box}>
      <Text style={[styles.text, { paddingBottom: 10 }]}>
        APPLICANT RELEASE OF INFORMATION AND CERTIFICATION (To be completed by physician){'\n'}
        Release of Information Authorization{'\n'}
      </Text>
      <Text style={[styles.text, { paddingBottom: 10 }]}>
        I request and authorize every person, medical school, university, hospital, government agency, or other entity
        to release information to ECFMG bearing on the content of my request or any document submitted to ECFMG,
        including, but not limited to, records, diplomas, transcripts, and other documents concerning my identity,
        citizenship or immigration status, educational, academic or professional history and status, or enrollment.
      </Text>
      <Text style={[styles.text, { paddingBottom: 10 }]}>
        I hereby authorize ECFMG to transmit any information in its possession, or that may otherwise become available
        to ECFMG, bearing on the content of my request or any other document submitted to ECFMG, including, but not
        limited to, records, diplomas, transcripts, and other documents concerning my identity, citizenship or
        immigration status, educational, academic or professional history and status, or enrollment, and determinations
        of irregular behavior to any federal, state, or local governmental department or agency, to any hospital or to
        any other organization or individual who, in the judgment of ECFMG, has a legitimate interest in such
        information.ƒ
      </Text>
      <Text style={[styles.text, { paddingBottom: 10 }]}>
        I also extend absolute immunity to, and release, other agencies, medical schools, universities, institutions,
        hospitals and clinics, and registration and licensing authorities providing information, their employees,
        representatives, directors, and officers, and any third parties and organizations for their acts,
        communications, reports, records, diplomas, transcripts, statements, documents, recommendations, or disclosures
        involving me, made in good faith and without malice, requested by ECFMG.
      </Text>
      <Text style={[styles.text, { paddingBottom: 10 }]}>
        I HAVE READ, UNDERSTOOD AND AGREE TO THIS RELEASE OF INFORMATION AUTHORIZATION AND I INTEND TO BE LEGALLY BOUND
        BY IT.
      </Text>
      <Text style={[styles.text]}>Certification</Text>
      <Text style={[styles.text, { paddingBottom: 10 }]}>
        I certify that I am the individual named above, am represented in the attached photograph, the attached passport
        is a copy of the passport that was issued to me, and that the signature below is my signature.
      </Text>
      <Text style={[styles.text, { paddingBottom: 10 }]}>
        I hereby certify that I have read, understood, and agree to all of the above statements. I also certify that I
        have read the ECFMG Policies and Procedures Regarding Irregular Behavior and agree to abide by these policies
        and procedures. I certify I understand that, as provided in the ECFMG Policies and Procedures Regarding
        Irregular Behavior, among other things, ECFMG may find that submission of falsified documents to ECFMG through
        EPIC constitutes irregular behavior, which could result in actions including permanent revocation of or
        permanent bar to ECFMG Certification, among other things.
      </Text>
      <View style={styles.leftColumn}>
        <Text style={styles.text}>X</Text>
        <Text style={styles.divider}></Text>
        <Text style={styles.divider}></Text>
      </View>
      <View style={styles.leftColumn}>
        <Text style={[styles.text, { marginRight: 95, marginLeft: 5 }]}>Signature of Applicant</Text>
        <Text style={styles.text}>Date</Text>
      </View>
    </View>
  );
};
export default PdfApplicantCertification;
