import {View, Text, Button, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StackParamList = {
  navigate: any;
};

type Voyage = {
  mmsi: any;
  start_at_sea: number;
};

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
        await AsyncStorage.setItem(`voyage:${newVoyage.start_at_sea}`, JSON.stringify(newVoyage));
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsAtSea(false);
      const disembark: number = Date.now();
      try {
        const restOfVoyageString: any = await AsyncStorage.getItem(`voyage:${startTimestamp}`);
        const restOfVoyage = JSON.parse(restOfVoyageString);
        restOfVoyage.end_at_sea = disembark;
        await AsyncStorage.setItem(`voyage:${restOfVoyage.start_at_sea}`, JSON.stringify(restOfVoyage));
        const test = await AsyncStorage.getItem(`voyage:${startTimestamp}`);
        console.log(test)
      } catch (err) {
        console.log(err);
      }
    };
  };

  const handleInCommand = async () => {
    if(isAtSea){
      const startInCommand: number = Date.now();
      try {
        const restOfVoyageString: any = await AsyncStorage.getItem(`voyage:${startTimestamp}`);
        const restOfVoyage = JSON.parse(restOfVoyageString);
        restOfVoyage.start_command = startInCommand;
        await AsyncStorage.setItem(`voyage:${restOfVoyage.start_at_sea}`, JSON.stringify(restOfVoyage));
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
