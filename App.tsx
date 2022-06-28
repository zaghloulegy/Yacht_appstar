import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import '@aws-amplify/ui-react/styles.css';
import Loading from './src/components/Loading';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

// eslint-disable-next-line require-jsdoc
const App = (props: any) => {
  let user: any = props.user
  let signOut: any = props.signOut

  return (
    <>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Loading />
      <h1>Hello {user.attributes.email.split('@')[0]}</h1>
      <button onClick={signOut}>Sign out</button>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3557',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App);