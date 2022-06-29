import {View, Text, Button, TextInput} from 'react-native';
import React from 'react';
import Footer from '../components/Footer';

const AddVessel = () => {
  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }
    }>
      <Text>Add Vessel</Text>

      <TextInput placeholder='MMSI Number'/>
      <Button title="Submit"></Button>
      <Footer />
    </View>
  );
};

export default AddVessel;
