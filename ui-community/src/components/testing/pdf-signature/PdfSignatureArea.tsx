import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';

interface PdfCredentialDetailsProps {
  imageSource: any;
}

export const PdfSignatureArea: React.FC<PdfCredentialDetailsProps> = (props) => {
  const styles = StyleSheet.create({
    text: {
      fontSize: '8px'
    },
    leftColumn: {
      flexDirection: 'row',
      paddingRight: 20,
      marginLeft: 10,
      textAlign: 'center'
    },
    subLeftColumn: {
      flexDirection: 'row',
      paddingRight: 20,
      marginLeft: 40,
      textAlign: 'center'
    },
    shortLeftColumn: {
      flexDirection: 'row',
      paddingRight: 20
    },
    row: {
      width: '100%'
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
    smallDivider: {
      height: '1px',
      border: 0,
      borderTop: '1px solid #ccc',
      padding: 0,
      color: '#00FFFF',
      marginTop: 20,
      width: '100%',
      marginLeft: 20
    },
    image: {
      width: '100%',
      paddingRight: '20px'
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
      <Text style={styles.divider}></Text>
      <View style={styles.leftColumn}>
        <View style={styles.row}>
          <Text style={styles.text}>Signature</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Date of Signature</Text>
        </View>
      </View>
      <View style={styles.shortLeftColumn}>
        <View style={styles.row}>
          <Text style={styles.smallDivider}></Text>
          <View style={styles.subLeftColumn}>
            <View style={styles.row}>
              <Text style={styles.text}>Printed Name</Text>
            </View>
          </View>
          <Text style={styles.smallDivider}></Text>
          <View style={styles.subLeftColumn}>
            <View style={styles.row}>
              <Text style={styles.text}>Title of Your Institution</Text>
            </View>
          </View>
          <Text style={styles.smallDivider}></Text>
          <View style={styles.subLeftColumn}>
            <View style={styles.row}>
              <Text style={styles.text}>Name of Your Institution</Text>
            </View>
          </View>
          <Text style={styles.smallDivider}></Text>
          <View style={styles.subLeftColumn}>
            <View style={styles.row}>
              <Text style={styles.text}>Your Contact E-mail</Text>
            </View>
          </View>
        </View>
        <Image style={styles.image} src={props.imageSource} />
      </View>
    </>
  );
};

export default PdfSignatureArea;
