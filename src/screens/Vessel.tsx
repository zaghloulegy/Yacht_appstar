import {View, Text, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';


type StackParamList = {
  navigate: any;
};

const Vessel = () => {
  const navigation = useNavigation<StackParamList>();

  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }
    }>
      <Text>Vessel</Text>
      <Button title="At Sea"></Button>
      <Button title="In Command" onPress={() => navigation.navigate('In Command')}></Button>
    
      <Footer />
    </View>
  );
};

export default Vessel;
