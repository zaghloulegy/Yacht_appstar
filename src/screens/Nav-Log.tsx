import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Footer from '../components/Footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExportNavLog from '../components/exportNavLog';
import convertTime from '../utils/timeconvert';

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
      try {
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
        });
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
        <Text style={{color: '#F1FAEE', fontWeight: '600', fontSize: 30}}>Nav Log</Text>

        <View style={{backgroundColor: '#A8DADC', padding: 10}}>
          <Text>Total Distance: {totalDistance}Nm</Text>
          <Text>Total Nighthours: {totalNighthours}h</Text>
          <Text>Total Days In Command: {totalInCommand}</Text>
          <Text>Total Days at Sea: {totalDaysAtSea}</Text>
        </View>

        <ExportNavLog voyages={voyages} totalDistance={totalDistance} totalNighthours={totalNighthours} totalInCommand={totalInCommand} totalDaysAtSea={totalDaysAtSea}/>

        <View style={{width: '95%', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#A8DADC', margin: 4, padding:4}}>
          <Text style={{borderColor: '#F1FAEE'}}>MMSI</Text>
          <Text>Heading</Text>
          <Text>Course</Text>
          <Text>Lon</Text>
          <Text>Lat</Text>
          <Text>Date</Text>
          <Text>Role</Text>
        </View>

        <ScrollView style={{width: '100%', height: 600, margin: 10}}>
          {voyages?voyages.map((voyage:any) => {
            const parsedData = JSON.parse(voyage[1]);
            return (<View key={voyage[0]}>
              {parsedData.voyageData.positions.map((position:any) => {
                return (
                  <View style={{flexShrink: 7, width: '95%', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#A8DADC', margin: 4, padding:6}} key={position.last_position_UTC}>
                    <Text style={{fontSize: 10}}>{parsedData.mmsi}</Text>
                    <Text style={{fontSize: 10}}>{position.heading}</Text>
                    <Text style={{fontSize: 10}}>{position.course}</Text>
                    <Text style={{fontSize: 10}}>{position.lon.toFixed(2)}</Text>
                    <Text style={{fontSize: 10}}>{position.lat.toFixed(2)}</Text>
                    <Text style={{fontSize: 10}}>{`${convertTime(position.last_position_epoch*1000)}`.replace(/\w{3}\+.+\(.+\)$|^\w+/g, '')}</Text>
                    <Text style={{fontSize: 10}}>{parsedData.start_command < position.last_position_epoch*1000&&parsedData.relinquish_command > position.last_position_epoch*1000?'Skipper':'Crew'}</Text>
                  </View>);
              })}
            </View>);
          }):<></>}
        </ScrollView>

      </View>
      <View style={{position: 'absolute', bottom: 10}}>
        <Footer />
      </View>
    </View>
  );
};

export default NavLog;
