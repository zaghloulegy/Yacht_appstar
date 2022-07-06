import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import convertTime from '../utils/timeconvert';
import APIConvertTime from '../utils/apiTimeConvert';
import {vesselAPICall} from '../utils/api';
import voyageTotalDistance from '../utils/voyageTotalDistance';
import daysDifference from '../utils/daysCalc';
import getNightHours from '../utils/get-night-hours';
import {Entypo} from '@expo/vector-icons';

type StackParamList = {
  navigate: any;
};

let initialRenderVessels: any;

const Voyages = () => {
  const navigation = useNavigation<StackParamList>();
  const [voyages, setVoyages] = useState(initialRenderVessels);
  const [addVoyages, setAddVoyages] = useState(true);

  const handleAPICall = async (voyage: any) => {
    const parsedData = JSON.parse(voyage[1]);
    const individualMMSI = parsedData.mmsi;
    const individualStart = parsedData.start_at_sea;
    const individualEnd = parsedData.end_at_sea;
    const startInCommand = parsedData.start_command;
    const endInCommand = parsedData.relinquish_command;

    try {
      const APIData:any = await vesselAPICall(individualMMSI, APIConvertTime(individualStart), APIConvertTime(individualEnd));
      const completedVoyageString: any = await AsyncStorage.getItem(`voyage:${individualStart}`);
      const completedVoyage = JSON.parse(completedVoyageString);
      completedVoyage.voyageData = APIData.data.data;
      const voyageDistance = voyageTotalDistance(completedVoyage.voyageData);
      const daysAtSea = daysDifference(individualEnd, individualStart);
      const daysInCommand = daysDifference(endInCommand, startInCommand);
      const nightswatch = getNightHours(APIData.data);
      completedVoyage.voyageReport = {'voyageDistance': voyageDistance, 'daysAtSea': daysAtSea, 'daysInCommand': daysInCommand, 'nightHours': nightswatch};
      await AsyncStorage.setItem(`voyage:${individualStart}`, JSON.stringify(completedVoyage));
      const vessel: any = await AsyncStorage.getItem(`vessel:${individualMMSI}`);
      const parsedVessel = JSON.parse(vessel);
      parsedVessel.name = completedVoyage.voyageData.name;
      await AsyncStorage.setItem(`vessel:${individualMMSI}`, JSON.stringify(parsedVessel));
      setAddVoyages(false);
    } catch (err) {
      console.log(err);
    }
  };

  const dummyFunc = async () => {
    const newVoyage = {
      mmsi: 227286000,
      start_at_sea: 1656633600000,
      end_at_sea: 1656720000000,
      start_command: 1656653400000,
      relinquish_command: 1656664200000,
    };
    await AsyncStorage.setItem(`voyage:${newVoyage.start_at_sea}`, JSON.stringify(newVoyage));
  };

  const removeVoyage = async (individualStart: any) => {
    try {
      await AsyncStorage.removeItem(`voyage:${individualStart}`);
      setAddVoyages(false);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  useEffect(() => {
    const renderVoyages = async () => {
      try {
        setAddVoyages(true);
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

      <View style={{position: 'absolute', top: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text style={{color: '#F1FAEE', fontWeight: '600', fontSize: 30}}>Voyages</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Nav Log')} style={{borderWidth: 1, padding: 20, backgroundColor: '#A8DADC', borderRadius: 10, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15, elevation: 2, marginLeft: 5, marginRight: 5, marginTop: 10}}>
          <Text>Latest Nav Log</Text>
        </TouchableOpacity>

        {voyages?voyages.map((voyage: any) => {
          const parsedData = JSON.parse(voyage[1]);
          const individualMMSI = parsedData.mmsi;
          const individualStart = parsedData.start_at_sea;
          const individualEnd = parsedData.end_at_sea;
          const voyageData = parsedData.voyageData;
          const parsedStart = `${convertTime(individualStart)}`.replace(/\w{3}\+.+\(.+\)$/, '');
          const parsedEnd = `${convertTime(individualEnd)}`.replace(/\w{3}\+.+\(.+\)$/, '');

          return (voyageData?<View style={{borderWidth: 1, padding: 20, backgroundColor: '#A8DADC', borderRadius: 2, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15, elevation: 2, marginLeft: 5, marginRight: 5, marginTop: 10}} key={voyage[0]}>
            <Text>Vessel: {voyageData.name}</Text>
            <Text>Start: {parsedStart}</Text>
            <Text>End: {parsedEnd}</Text>
            <Text>Night hours: {parsedData.voyageReport.nightHours}h</Text>
            <Text>Voyage Distance: {parsedData.voyageReport.voyageDistance}Nm</Text>
            <Text>Days at Sea: {parsedData.voyageReport.daysAtSea} days</Text>
            <Text>Days in Command: {parsedData.voyageReport.daysInCommand} days</Text>
            <TouchableOpacity style={{borderRadius: 100, width: 24,marginLeft: '43%',}} onPress={() => removeVoyage(individualStart)}>
              <Entypo name="cross" size={24} color="#E63946'" />
            </TouchableOpacity>
          </View>:
          <View style={{borderWidth: 1, padding: 20, backgroundColor: '#A8DADC', borderRadius: 10, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15, elevation: 2, marginLeft: 5, marginRight: 5, marginTop: 10}} key={voyage[0]}>
            <Text style={{fontSize: 17}}>MMSI: {individualMMSI}</Text>
            <Text style={{fontSize: 17}}>Start: {parsedStart}</Text>
            <Text style={{fontSize: 17}}>End: {parsedEnd}</Text>
            <TouchableOpacity style={{backgroundColor: 'red', padding: 10, borderRadius: 10, marginTop: 10}} onPress={() => handleAPICall(voyage)}>
              <Text style={{fontSize: 17, textAlign: 'center', color: 'white'}}>Create Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: 100, width: 24,marginLeft: '45%',}} onPress={() => removeVoyage(individualStart)}>
              <Entypo name="cross" size={24} color="#E63946'" />
            </TouchableOpacity>
          </View>
          );
        }):<></>}
        <TouchableOpacity style={{backgroundColor: '#A8DADC', padding: 10, borderRadius: 10, marginTop: 10}}>
          <Text onPress={dummyFunc} style={{fontSize: 17, textAlign: 'center', color: 'black'}}>dummy create</Text>
        </TouchableOpacity>
      </View>
      <View style={{position: 'absolute', bottom: 10}}>
        <Footer />
      </View>

    </View>
  );
};

export default Voyages;
