import {View, Text, TouchableOpacity, Button, StyleSheet} from 'react-native';
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

type StackParamList = {
  navigate: any;
};

let initialRenderVessels: any;

const Voyages = () => {
  const navigation = useNavigation<StackParamList>();
  const [voyages, setVoyages] = useState(initialRenderVessels);
  const [addVoyages, setAddVoyages] = useState(false);

  const handleAPICall = async (voyage: any) => {
    const individualMMSI = JSON.parse(voyage[1]).mmsi;
    const individualStart = JSON.parse(voyage[1]).start_at_sea;
    const individualEnd = JSON.parse(voyage[1]).end_at_sea;
    const startInCommand = JSON.parse(voyage[1]).start_command;
    const endInCommand = JSON.parse(voyage[1]).relinquish_command;
    try{
    const APIData:any = await vesselAPICall(individualMMSI, APIConvertTime(individualStart), APIConvertTime(individualEnd));
    console.log("from API",APIData);
    const completedVoyageString: any = await AsyncStorage.getItem(`voyage:${individualStart}`);
    const completedVoyage = JSON.parse(completedVoyageString);
    completedVoyage.voyageData = APIData.data.data;
    const voyageDistance = voyageTotalDistance(completedVoyage.voyageData);
    const daysAtSea = daysDifference(individualEnd, individualStart);
    const daysInCommand = daysDifference(endInCommand, startInCommand);
    completedVoyage.voyageReport = {'voyageDistance':voyageDistance,'daysAtSea':daysAtSea,'daysInCommand':daysInCommand};
    await AsyncStorage.setItem(`voyage:${individualStart}`, JSON.stringify(completedVoyage));
    const vessel: any = await AsyncStorage.getItem(`vessel:${individualMMSI}`);
    const parsedVessel = JSON.parse(vessel);
    parsedVessel.name = completedVoyage.voyageData.name;
    await AsyncStorage.setItem(`vessel:${individualMMSI}`, JSON.stringify(parsedVessel));
    } catch (err) {
      console.log(err);
    }
  }

  const dummyFunc = async () => {
    const newVoyage = {
      mmsi: 227286000,
      start_at_sea: 1656633600000,
      end_at_sea: 1656720000000,
      start_command: 1656653400000,
      relinquish_command: 1656664200000,
    };
    await AsyncStorage.setItem(`voyage:${newVoyage.start_at_sea}`, JSON.stringify(newVoyage));
  }

  useEffect(() => {
    const renderVoyages = async () => {
      try{
        setAddVoyages(false);
        const allKeys = await AsyncStorage.getAllKeys();
        let filterKeys = allKeys.filter((key:any) => {
          return  key.includes('voyage');
        })
        let allVoyages = await AsyncStorage.multiGet(filterKeys);
        setVoyages(allVoyages);
      } catch (err) {
        console.log('err: ', err);
      }
    };
    renderVoyages();
  }, [addVoyages])

  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#1D3557'
      }
    }>
      <Text style={{color:'#F1FAEE',fontWeight:'600',fontSize: 30}}>Voyages</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Nav Log')} style={{borderWidth: 1, padding: 20,backgroundColor: '#A8DADC', borderRadius: 10, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15,elevation: 2,marginLeft: 5, marginRight: 5, marginTop: 10,}}>
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
        
        return (voyageData?<View style={{borderWidth: 1, padding: 20,backgroundColor: '#A8DADC', borderRadius: 2, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15,elevation: 2,marginLeft: 5, marginRight: 5, marginTop: 10,}} key={voyage[0]}>
          <Text key={voyage[0]}>{parsedData.voyageReport.voyageDistance} {parsedData.voyageReport.daysAtSea} {parsedData.voyageReport.daysInCommand} {voyageData.name} {parsedStart} {parsedEnd}</Text>
        </View>:
          <View style={{borderWidth: 1, padding: 20,backgroundColor: '#A8DADC', borderRadius: 2, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15,elevation: 2,marginLeft: 5, marginRight: 5, marginTop: 10,}} key={voyage[0]}>
          <Text key={voyage[0]}>{individualMMSI} {parsedStart} {parsedEnd}</Text>
          <TouchableOpacity style={{backgroundColor:'red'}} onPress={() => handleAPICall(voyage)}>
            <Text>MAKE API CALL</Text>
          </TouchableOpacity>
          </View>
        )
      }):<></>}
      <Button onPress={dummyFunc} title="dummy create"></Button>
      <Footer />
    </View>
  );
};

const voyages = StyleSheet.create({
  view: {borderWidth: 1, padding: 20,backgroundColor: '#A8DADC', borderRadius: 2, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15,elevation: 2,marginLeft: 5, marginRight: 5, marginTop: 10,},
});

export default Voyages;
