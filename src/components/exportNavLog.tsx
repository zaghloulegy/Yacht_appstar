import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import * as Print from 'expo-print';
import {shareAsync} from 'expo-sharing';


const ExportNavLog = (props: any) => {
  const {voyages, totalDistance, totalNighthours, totalInCommand, totalDaysAtSea} = props;

  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="div-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Your Nav Log
    </h1>
    <header style={{flexShrink: "4", width: '100%', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#A8DADC', margin: 4, backgroundColor: '#A8DADC', padding: 10}}>
          <h2>Total Distance:${totalDistance}Nm</h2>
          <h2>Total Nighthours:${totalNighthours}h</h2>
          <h2>Total Days In Command:${totalInCommand}</h2>
          <h2>Total Days at Sea:${totalDaysAtSea}</h2>
    </header>
    ${voyages?voyages.map((voyage:any) => {
  const parsedData = JSON.parse(voyage[1]);
  return (<ul key={voyage[0]}>
    {parsedData.voyageData.positions.map((position:any) => {
      return (
        <li style={{flexShrink: '7', width: '100%', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: '#A8DADC', margin: 4}} key={position.last_position_UTC}>
          <div style={{fontSize: 10}}>{parsedData.mmsi}</div>
          <div style={{fontSize: 10}}>{position.heading}</div>
          <div style={{fontSize: 10}}>{position.course}</div>
          <div style={{fontSize: 10}}>{position.lon.toFixed(2)}</div>
          <div style={{fontSize: 10}}>{position.lat.toFixed(2)}</div>
          <div style={{fontSize: 10}}>{position.last_position_UTC}</div>
          <div style={{fontSize: 10}}>{parsedData.start_command < position.last_position_epoch*1000&&parsedData.relinquish_command > position.last_position_epoch*1000?'Crew':'Skipper'}</div>
        </li>);
    })}
  </ul>);
}):<></>}
  </body>
</html>
`;

  const handleExport = async () => {
    const {uri} = await Print.printToFileAsync({html});
    console.log('File has been saved to:', uri);
    await shareAsync(uri, {UTI: '.pdf', mimeType: 'application/pdf'});
  };
  return (
    <TouchableOpacity onPress={handleExport} style={{borderWidth: 1, padding: 20, backgroundColor: '#A8DADC', borderRadius: 10, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15, elevation: 2, marginLeft: 5, marginRight: 5, marginTop: 10}}>
      <Text>Export Nav Log</Text>
    </TouchableOpacity>);
};

export default ExportNavLog;
