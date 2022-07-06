import {View, Text, TouchableOpacity} from 'react-native';
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
  const [atSeaError, setAtSeaError] = useState(false);

  const handleAtSea = async () => {
    if (!isAtSea) {
      const startSea: number = Date.now();
      setIsAtSea(true);
      setAtSeaError(false);
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
      } catch (err) {
        console.log(err);
      }
    };
  };

  const handleInCommand = async () => {
    if (isAtSea) {
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
    } else {
      setAtSeaError(true);
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
        <Text style={{color: '#F1FAEE', fontWeight: '600', fontSize: 30}}>Vessel: {props.route.params.mmsi}</Text>
        <TouchableOpacity testID='atSea' onPress={handleAtSea} style={{borderWidth: 0.5, padding: 20, backgroundColor: '#A8DADC', borderRadius: 100, borderColor: 'black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15, elevation: 2, marginLeft: 5, marginRight: 5, marginTop: 10, width: '200px', overflow: 'hidden', alignItems: 'center'}}>
          <Text testID='disembark' style={{fontSize: 25}}>{isAtSea?'Disembark':'At Sea'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleInCommand} style={{borderWidth: 0.5, padding: 20, backgroundColor: '#A8DADC', borderRadius: 100, borderColor: 'black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15, elevation: 2, marginLeft: 5, marginRight: 5, marginTop: 10, width: '200px', overflow: 'hidden', alignItems: 'center'}}>
          <Text style={{fontSize: 25}}>In Command</Text>
        </TouchableOpacity>
        {atSeaError?<View style={{backgroundColor: '#E63946'}}>
          <Text style={{color: 'white'}}>You must be at sea to be in command of a vessel</Text>
        </View>:<></>}
      </View>
      {isAtSea?<></>:<View style={{position: 'absolute', bottom: 10}}>
        <Footer />
      </View>}
    </View>
  );
};

export default Vessel;
