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
        backgroundColor: '#1D3557'
      }
    }>
      <Text style={{color:'#F1FAEE',fontWeight:'600',fontSize: 30}}>Add Vessel</Text>

      <TextInput style={{backgroundColor:'#F1FAEE',padding:2}} placeholder='MMSI Number' placeholderTextColor="black"/>
      <Button title="Submit"></Button>
      <Footer />
    </View>
  );
};

export default AddVessel;
