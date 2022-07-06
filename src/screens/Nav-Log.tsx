import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';

let initialRenderVessels: any;

const NavLog = () => {
  const [voyages, setVoyages] = useState(initialRenderVessels);
  const [addVoyages, setAddVoyages] = useState(true);
  const [totalDistance, setTotalDistance] = useState(Number);
  const [totalNighthours, setTotalNighthours] = useState(Number);
  const [totalInCommand, setTotalInCommand] = useState(Number);
  const [totalDaysAtSea, setTotalDaysAtSea] = useState(Number);

  useEffect(() => {
    const renderVoyages = async () => {
      try{
        setAddVoyages(true);
        const allKeys = await AsyncStorage.getAllKeys();
        const filterKeys = allKeys.filter((key:any) => {
          return key.includes('voyage');
        });
        const allVoyages:any = await AsyncStorage.multiGet(filterKeys);
        setVoyages(allVoyages);
        allVoyages.map((voyage:any) => {
          const parsedData = JSON.parse(voyage[1]);
          setTotalDistance(totalDistance + parseFloat(parsedData.voyageReport.voyageDistance));
          setTotalNighthours(totalNighthours + parseFloat(parsedData.voyageReport.nightHours));
          setTotalInCommand(totalInCommand + parseFloat(parsedData.voyageReport.daysInCommand));
          setTotalDaysAtSea(totalDaysAtSea + parseFloat(parsedData.voyageReport.voyageDistance));
        })
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
        backgroundColor: '#1D3557'
      }
    }>
    <View style={{position:'absolute',top: 10,flexDirection: 'column', alignItems: 'center',justifyContent: 'center',flex: 1,}}>
      <Text style={{color:'#F1FAEE',fontWeight:'600',fontSize: 30}}>Nav Log</Text>

    <View style={{backgroundColor: '#A8DADC',padding:10}}>
      <Text>Total Distance:{totalDistance}Nm Total Nighthours:{totalNighthours}h</Text>
      <Text>Total Days In Command:{totalInCommand} Total Days at Sea:{totalDaysAtSea}</Text>
    </View>

    <TouchableOpacity style={{borderWidth: 1, padding: 20,backgroundColor: '#A8DADC', borderRadius: 10, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15,elevation: 2,marginLeft: 5, marginRight: 5, marginTop: 10,}}>
      <Text>Export Nav Log</Text>
    </TouchableOpacity>

    <ScrollView style={{height:600,margin:10}}>
      {voyages?voyages.map((voyage:any) => {
        const parsedData = JSON.parse(voyage[1]);
        console.log(parsedData)
        return (<View key={voyage[0]}>
          {parsedData.voyageData.positions.map((position:any) => {
          return(
          <View style={{backgroundColor:'#A8DADC',margin:4}} key={position.last_position_UTC}>
            <Text>MMSI: {parsedData.mmsi}</Text>
            <Text>Heading: {position.heading}</Text>
            <Text>Course: {position.course}</Text>
            <Text>Lon: {position.lon}</Text>
            <Text>Lat: {position.lat}</Text>
            <Text>Date: {position.last_position_UTC}</Text>
            <Text>Role: </Text>
          </View>);
        })}
        </View>)
      }):<></>}
    </ScrollView>
      
    </View>
      <View style={{position:'absolute',bottom:10,}}>
        <Footer />
      </View>
    </View>
  );
};

export default NavLog;
