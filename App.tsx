import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import '@aws-amplify/ui-react/styles.css';
import {Amplify, API } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import Routes from './src/routes';
import {UserContext} from './src/contexts/User';


Amplify.configure(awsconfig);

// eslint-disable-next-line require-jsdoc
const App = () => {
  const [logIn, setLogIn] = useState('');

  let sampleUserContext: any;

  useEffect(() => {
    sampleUserContext = {
      signOut: logIn,
    }
  }, [logIn])

  return (
    <>
    <UserContext.Provider value={sampleUserContext}>
      <Routes setLogIn={setLogIn}/>
    </UserContext.Provider>
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

export default App;