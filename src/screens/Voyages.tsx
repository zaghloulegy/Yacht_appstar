import {View, Text, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';

type StackParamList = {
  navigate: any;
};

const Voyages = () => {
  const navigation = useNavigation<StackParamList>();

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
      
      <Button title="Latest Nav Log" onPress={() => navigation.navigate('Nav Log')}></Button>
      <Footer />
    </View>
  );
};

export default Voyages;
