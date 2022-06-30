/* eslint-disable require-jsdoc */
import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface VesselInterface {
  mmsi: number;
  name: string;
}
const vessel: VesselInterface = {mmsi: 0, name: ''};

const AddVessel = () => {
  const [newVessel, setNewVessel]= useState(vessel);

  const handleAddVessel = async (event: any) => {
    vessel.mmsi = event.target.value;
    setNewVessel(vessel);
    try {
      const vesselStringify = JSON.stringify(newVessel);
      await AsyncStorage.setItem(`${newVessel.mmsi}`, vesselStringify);
      console.log('out of storage', AsyncStorage.getItem(`${newVessel.mmsi}`));
    } catch (err) {
      console.log('err: ', err);
    }
  };

  
  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#1D3557',
      }
    }>
      <Text style={{color: '#F1FAEE', fontWeight: '600', fontSize: 30}}>Add Vessel</Text>

      <TextInput onSubmitEditing={handleAddVessel} style={{backgroundColor: '#F1FAEE', padding: 2}} placeholder='MMSI Number' placeholderTextColor="black"/>
      <Footer />
    </View>
  );
};

export default AddVessel;
