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
      console.log('Date.now(): ', Date.now());
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
    };
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
      <TouchableOpacity onPress={() => navigation.navigate('In Command')}>
        <Text >In Command</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

export default Vessel;
