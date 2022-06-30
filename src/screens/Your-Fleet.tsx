import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';
import { Entypo } from '@expo/vector-icons';
import {withAuthenticator} from '@aws-amplify/ui-react';

type StackParamList = {
  navigate: any;
};

const YourFleet = (props: any) => {
  const navigation = useNavigation<StackParamList>();
  console.log(props, 'fleet')

  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#1D3557',
      }
    }>
      <Text style={{color:'#F1FAEE',fontWeight:'600',fontSize: 30}}>Your Fleet</Text>

      <TouchableOpacity style={{
        backgroundColor: '#457B9D',
        marginTop: 12,
        padding: 8,
        borderRadius: 5,
      }} onPress={() => navigation.navigate('Vessel')}>
        <Text style={{fontSize: 20, color: '#ffffff',}}>A Vessel</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Add Vessel')}>
        <Entypo name="plus" size={24} color="#A8DADC" />
      </TouchableOpacity>
      <Footer/>
    </View>
  );
};

export default withAuthenticator(YourFleet);
