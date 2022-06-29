import {View, Text} from 'react-native';
import React from 'react';

const AddVessel = () => {
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
    </View>
  );
};

export default AddVessel;
