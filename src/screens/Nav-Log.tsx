import {View, Text, Button, Touchable, TouchableOpacity} from 'react-native';
import React from 'react';
import Footer from '../components/Footer';

const NavLog = () => {
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
      <TouchableOpacity style={{borderWidth: 1, padding: 20,backgroundColor: '#A8DADC', borderRadius: 10, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15,elevation: 2,marginLeft: 5, marginRight: 5, marginTop: 10,}}>
        <Text>Export Nav Log</Text>
      </TouchableOpacity>
    </View>
      <View style={{position:'absolute',bottom:10,}}>
        <Footer />
      </View>
    </View>
  );
};

export default NavLog;
