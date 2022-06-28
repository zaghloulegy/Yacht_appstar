/* eslint-disable max-len */
import {View, Text, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  },
  baseText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 32,
  },
});

const Loading = () => {
  return (
    <View>
      <Image source={require('../../assets/Loading-Badge.png')} style={styles.logo}/>
      <Text style={styles.baseText}>Loading</Text>
    </View>
  );
};

export default Loading;
