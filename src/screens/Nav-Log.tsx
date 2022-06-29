import {View, Text, Button} from 'react-native';
import React from 'react';
import Footer from '../components/Footer';

const NavLog = () => {
  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }
    }>
      <Text>Nav Log</Text>
      <Button title='Export Nav Log'></Button>
      <Footer />
    </View>
  );
};

export default NavLog;
