import {View, Text, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';
import { Entypo } from '@expo/vector-icons';
import {withAuthenticator} from '@aws-amplify/ui-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import clearData from '../utils/clear-data';

type StackParamList = {
  navigate: any;
};

let initialRenderVessels: any;

const renderVessels = async () => {
  try{
    const allKeys = await AsyncStorage.getAllKeys();
    let filterKeys = allKeys.filter((key) => {
      return  key.includes('vessel');
    })
    let allVessels = await AsyncStorage.multiGet(filterKeys);
    initialRenderVessels = allVessels;
  } catch (err) {
    console.log('err: ', err);
  }
};

renderVessels();


const YourFleet = () => {
  const navigation = useNavigation<StackParamList>();
  const [vessels, setVessels] = useState(initialRenderVessels);
  const [render, setRender] = useState(true);

  // useEffect(() => {
  //   console.log(1)
  //   const renderVessels = async () => {
  //     try{
  //       const allKeys = await AsyncStorage.getAllKeys();
  //       console.log(allKeys, 'allKeys')
  //       let filterKeys = allKeys.filter((key) => {
  //         return  key.includes('vessel');
  //       })
  //       let allVessels = await AsyncStorage.multiGet(filterKeys);
  //       console.log(allVessels, 'allVessels')
  //       setVessels(allVessels);
  //       console.log(vessels, 'vessels')
  //     } catch (err) {
  //       console.log('err: ', err);
  //     }
  //   };
  //   renderVessels();
  // }, [render])

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

      <View>
      {vessels.map((vessel: any) => {
        console.log(vessel)
        return (
          <Text key={vessel[0]}>{vessel[1]}</Text>
        )
      })};
      </View>

      {/* <TouchableOpacity style={{
        backgroundColor: '#457B9D',
        marginTop: 12,
        padding: 8,
        borderRadius: 5,
      }}>
        <Text style={{fontSize: 20, color: '#ffffff',}}>A Vessel</Text>
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() => navigation.navigate('Add Vessel', {'Hello': 'Hello'})}>
        <Entypo name="plus" size={24} color="#A8DADC" />
      </TouchableOpacity>

      <Button title="Delete" onPress={clearData}></Button>
      <Footer/>
    </View>
  );
};

export default withAuthenticator(YourFleet);
