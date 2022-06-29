import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import '@aws-amplify/ui-react/styles.css';
import Loading from './src/components/Loading';
import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react';
import Routes from './src/routes';

Amplify.configure(awsconfig);

// eslint-disable-next-line require-jsdoc
const App = (props: any) => {
  const user: any = props.user;
  const signOut: any = props.signOut;
  return (
    <>
      <Routes/>
      {/* <View style={styles.container}>
        <StatusBar style="auto" />
        <Loading />
        <h1 style={{
          fontSize: 20,
          color: '#ffffff',
        }}>Hello {user.attributes.email.split('@')[0]}</h1>
        <button onClick={signOut}>Sign out</button>
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3557',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App);
