import {View, Text, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import convertTime from '../utils/timeconvert';
import APIConvertTime from '../utils/apiTimeConvert';
import {vesselAPICall} from '../utils/api';

type StackParamList = {
  navigate: any;
};

let initialRenderVessels: any;

const Voyages = () => {
  const navigation = useNavigation<StackParamList>();
  const [voyages, setVoyages] = useState(initialRenderVessels);
  const [addVoyages, setAddVoyages] = useState(false);

  const handleAPICall = async (voyage: any) => {
    const individualMMSI = '227286000';
    // const individualStart = JSON.parse(voyage[1]).start_at_sea;
    // const individualEnd = JSON.parse(voyage[1]).end_at_sea;
    try {
      const APIData = await vesselAPICall(individualMMSI, '2022-07-01', '2022-07-02');
      console.log('from API', APIData);
    // const completedVoyageString: any = await AsyncStorage.getItem(`voyage:${individualStart}`);
    // const completedVoyage = JSON.parse(completedVoyageString);
    // completedVoyage.voyageData = APIData;
    // await AsyncStorage.setItem(`voyage:${individualStart}`, JSON.stringify(completedVoyage));
    } catch (err) {
      console.log(err);
    }
  };

  const testFunc = async (individualStart: any) => {
    const test: any = await AsyncStorage.getItem(`voyage:${individualStart}`);
    console.log(test.voyageData);
  };

  useEffect(() => {
    const renderVoyages = async () => {
      try {
        setAddVoyages(false);
        const allKeys = await AsyncStorage.getAllKeys();
        const filterKeys = allKeys.filter((key:any) => {
          return key.includes('voyage');
        });
        const allVoyages = await AsyncStorage.multiGet(filterKeys);
        setVoyages(allVoyages);
      } catch (err) {
        console.log('err: ', err);
      }
    };
    renderVoyages();
  }, [addVoyages]);

  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#1D3557',
      }
    }>
      <Text style={{color: '#F1FAEE', fontWeight: '600', fontSize: 30}}>Voyages</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Nav Log')} style={{borderWidth: 1, padding: 20, backgroundColor: '#A8DADC', borderRadius: 10, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15, elevation: 2, marginLeft: 5, marginRight: 5, marginTop: 10}}>
        <Text>Latest Nav Log</Text>
      </TouchableOpacity>

      {voyages?voyages.map((voyage: any) => {
        const individualMMSI = JSON.parse(voyage[1]).mmsi;
        const individualStart = JSON.parse(voyage[1]).start_at_sea;
        const individualEnd = JSON.parse(voyage[1]).end_at_sea;
        const parsedStart = `${convertTime(individualStart)}`.replace(/\w{3}\+.+\(.+\)$/, '');
        const parsedEnd = `${convertTime(individualEnd)}`.replace(/\w{3}\+.+\(.+\)$/, '');
        return (
          <View style={{borderWidth: 1, padding: 20, backgroundColor: '#A8DADC', borderRadius: 2, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15, elevation: 2, marginLeft: 5, marginRight: 5, marginTop: 10}} key={voyage[0]}>
            <Text key={voyage[0]}>MMSI:{individualMMSI}, start:{parsedStart}, end:{parsedEnd}</Text>
            <TouchableOpacity style={{backgroundColor: 'red'}} onPress={() => handleAPICall(voyage)}>
              <Text>MAKE API CALL</Text>
            </TouchableOpacity>
            <Button title="check" onPress={() => {
              testFunc(individualStart);
            }}></Button>
          </View>
        );
      }):<></>}
      <Footer />
    </View>
  );
};

export default Voyages;
