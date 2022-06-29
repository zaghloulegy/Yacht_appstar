import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AddVessel from '../../screens/Add-Vessel';
import FrontPage from '../../screens/Front-Page';
import InCommand from '../../screens/In-Command';
import NavLog from '../../screens/Nav-Log';
import Profile from '../../screens/Profile';
import SignIn from '../../screens/Sign-In';
import Vessel from '../../screens/Vessel';
import Voyages from '../../screens/Voyages';
import YourFleet from '../../screens/Your-Fleet';


const {Navigator, Screen} = createNativeStackNavigator();

const StackPile = () => {
  return (
    <Navigator initialRouteName='Your Fleet'>
      <Screen name='Your Fleet' component={YourFleet}/>
      <Screen name='Voyages' component={Voyages}/>
      <Screen name='Vessel' component={Vessel}/>
      <Screen name='Sign In' component={SignIn}/>
      <Screen name='Profile' component={Profile}/>
      <Screen name='Nav Log' component={NavLog}/>
      <Screen name='In Command' component={InCommand} options={{headerShown:false}}/>
      <Screen name='Front Page' component={FrontPage}/>
      <Screen name='Add Vessel' component={AddVessel}/>
    </Navigator>
  );
};

export default StackPile;
