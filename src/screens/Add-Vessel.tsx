/* eslint-disable require-jsdoc */
import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

interface VesselInterface {
  mmsi: string;
  name: string;
};

type StackParamList = {
  navigate: any;
};

const vessel: VesselInterface = {mmsi: '', name: ''};

const AddVessel = (props: any) => {
  const navigation = useNavigation<StackParamList>();
  console.log(props, 'props')

  const handleAddVessel = async (event: any) => {

    if(/\d+/.test(event.target.value)) {
    vessel.mmsi = event.target.value;
    try {
      const vesselStringify = JSON.stringify(vessel);
      await AsyncStorage.setItem(`vessel:${vessel.mmsi}`, vesselStringify);
    } catch (err) {
      console.log('err: ', err);
    }
    navigation.navigate('Your Fleet');
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
