import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';

import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';


// eslint-disable-next-line require-jsdoc
export default function App() {
  return (
    <View style={styles.container}>
      <Authenticator hideDefault={true}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
