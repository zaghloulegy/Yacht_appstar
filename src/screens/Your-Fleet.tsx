import {View, Text, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';

type StackParamList = {
  navigate: any;
};

const YourFleet = () => {
  const navigation = useNavigation<StackParamList>();

  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }
    }>
      <Text>Your Fleet</Text>

      <TouchableOpacity style={{
        backgroundColor: '#457B9D',
        marginTop: 12,
        padding: 8,
        borderRadius: 5,
      }} onPress={() => navigation.navigate('Vessel')}>
        <Text style={{fontSize: 20, color: '#ffffff',}}>A Vessel</Text>
      </TouchableOpacity>

      <Button title="+" onPress={() => navigation.navigate('Add Vessel')}></Button>

      <Footer />
    </View>
  );
};

export default YourFleet;
