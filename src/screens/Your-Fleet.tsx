import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';


const YourFleet = () => {
  const navigation = useNavigation();

  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }
    }>
      <Text style={{
        fontSize: 20,
        color: '#ffffff',
      }}>Your-Fleet</Text>
      <TouchableOpacity style={{
        fontSize: 20,
        color: '#ffffff',
        backgroundColor: '#457B9D',
        marginTop: 12,
        padding: 8,
        borderRadius: 5,
      }} onPress={()=> navigation.navigate('Vessel')}>
        <Text >A Vessel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default YourFleet;
