import {View, Text, Button, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';
import {AsyncStorage} from '@aws-amplify/core';


type StackParamList = {
  navigate: any;
};

type Voyage = {
  mmsi: any;
  start_at_sea: number;
};

type MergeVoyage = {
  end_at_sea: number;
};

type InCommand = {
  mmsi: any;
  start_command: number;
}

const Vessel = (props:any) => {
  const navigation = useNavigation<StackParamList>();
  const [isAtSea, setIsAtSea] = useState(false);
  const [startTimestamp, setStartTimestap] = useState(Number);

  const handleAtSea = async () => {
    if (!isAtSea) {
      const startSea: number = Date.now();
      setIsAtSea(true);
      setStartTimestap(startSea);
      const newVoyage: Voyage = {
        mmsi: props.route.params.mmsi,
        start_at_sea: startSea,
      };
      try {
        console.log('newVoyage: ', newVoyage);
        await AsyncStorage.setItem(`voyage:${newVoyage.start_at_sea}`, newVoyage);
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsAtSea(false);
      const disembark: number = Date.now();
      const newVoyage: MergeVoyage = {
        end_at_sea: disembark,
      };
      try {
        console.log('newVoyage: ', newVoyage);
        //await AsyncStorage.mergeItem(`voyage:${startTimestamp}`, JSON.stringify(newVoyage));
        //mergeItem is not a function? old version of AsyncStorage? I can resolve with out the function we'll discuss it on monday
      } catch (err) {
        console.log(err);
      }
    };
  };

  const handleInCommand = async () => {
    if(isAtSea){
      const startInCommand: number = Date.now();
      const newInCommand: InCommand = {
        mmsi: props.route.params.mmsi,
        start_command: startInCommand,
      };
      try {
        console.log('newInCommand: ', newInCommand);
        //await AsyncStorage.mergeItem(`voyage:${startTimestamp}`, JSON.stringify(newInCommand));
        navigation.navigate('In Command', {'mmsi': props.route.params.mmsi, 'startTimestamp': startTimestamp});
      } catch (err) {
        console.log(err);
      }
    }else{
      //error must be at sea to be in command of a vessel
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
      <Text style={{color: '#F1FAEE', fontWeight: '600', fontSize: 30}}>Vessel: {props.route.params.mmsi}</Text>
      <TouchableOpacity onPress={handleAtSea}>
        <Text >{isAtSea?'Disembark':'At Sea'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleInCommand}>
        <Text >In Command</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

export default Vessel;
