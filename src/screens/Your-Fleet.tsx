import {View, Text, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';
import { Entypo } from '@expo/vector-icons';
import {withAuthenticator} from '@aws-amplify/ui-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import clearData from '../utils/clear-data';
import App from '../../App';

type StackParamList = {
  navigate: any;
};

let initialRenderVessels: any;

const YourFleet = () => {
  const navigation = useNavigation<StackParamList>();
  const [vessels, setVessels] = useState(initialRenderVessels);
  const [addVessel, setAddVessel] = useState(false);

  useEffect(() => {
    const renderVessels = async () => {
      try{
        setAddVessel(false);
        const allKeys = await AsyncStorage.getAllKeys();
        let filterKeys = allKeys.filter((key) => {
          return  key.includes('vessel');
        })
        let allVessels = await AsyncStorage.multiGet(filterKeys);
        setVessels(allVessels);
      } catch (err) {
        console.log('err: ', err);
      }
    };
    renderVessels();
  }, [addVessel]);

  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#1D3557',
      }
    }>
      <Text style={{color:'#F1FAEE',fontWeight:'600',fontSize: 30}}>Your Fleet</Text>

      {vessels?vessels.map((vessel: any) => {
        const individualMMSI = JSON.parse(vessel[1]).mmsi
        const individualName = JSON.parse(vessel[1]).name
        return (
          <View key={vessel[0]}>
            <TouchableOpacity key={vessel[0]} onPress={() => navigation.navigate('Vessel', {'mmsi': individualMMSI})}>
            <Text style={{padding: 26,backgroundColor: '#A8DADC', borderRadius: 100, borderColor: 'black', alignItems: 'center',margin:10,height:'100%',textAlign:'center', width:'200px',}} key={vessel[0]}>{individualName?individualName:individualMMSI}</Text>
            </TouchableOpacity>
          </View>
        );
      }):<></>}
      <TouchableOpacity onPress={() => navigation.navigate('Add Vessel', {'addVessel':setAddVessel})}>
        <Entypo name="plus" size={24} color="#A8DADC" />
      </TouchableOpacity>

      <Button title="Delete" onPress={clearData}></Button>
      <Footer/>
    </View>
  );
};

export default withAuthenticator(YourFleet, {
  socialProviders: ['apple', 'google', 'facebook', 'amazon'],
});
