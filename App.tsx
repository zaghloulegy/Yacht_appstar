import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import {useEffect, useState} from 'react';
import '@aws-amplify/ui-react/styles.css';
import {Amplify, API} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import Routes from './src/routes';

Amplify.configure(awsconfig);

// eslint-disable-next-line require-jsdoc
const App = () => {
  return (
    <>
      <Routes />
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
