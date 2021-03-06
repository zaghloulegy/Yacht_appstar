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
  const [addVesselsError, setAddVesselsError] = useState(false);

  const handleAddVessel = async (event: any) => {
    if (/^\d{9}$/.test(event.target.value)) {
      props.route.params.addVessel(true);
      vessel.mmsi = event.target.value;
      try {
        setAddVesselsError(true);
        const vesselStringify = JSON.stringify(vessel);
        await AsyncStorage.setItem(`vessel:${vessel.mmsi}`, vesselStringify);
      } catch (err) {
        console.log('err: ', err);
      }
      navigation.navigate('Your Fleet');
    } else {
      setAddVesselsError(true);
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
      <View style={{position: 'absolute', top: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{color: '#F1FAEE', fontWeight: '600', fontSize: 30}}>Add Vessel</Text>

        <TextInput testID='MMSI-input' onSubmitEditing={handleAddVessel} style={{backgroundColor: '#F1FAEE', height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10}} placeholder='MMSI Number' placeholderTextColor="black"/>
        {addVesselsError?<View style={{backgroundColor: '#E63946'}}>
          <Text style={{color: 'white', padding: 10, fontSize:15}}>You must provide a valid mmsi</Text>
        </View>:<></>}
      </View>
      <View testID='menuID' style={{position: 'absolute', bottom: 10}}>
        <Footer />
      </View>
    </View>
  );
};

export default AddVessel;
