import {View, Text, Button} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

type StackParamList = {
  navigate: any;
};

const InCommand = () => {
  const navigation = useNavigation<StackParamList>();

  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'black'
      }
    }>

      <Button title="Relinquish Command" onPress={() => navigation.navigate('Vessel')}></Button>
    </View>
  );
};

export default InCommand;
