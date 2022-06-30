import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

type StackParamList = {
  navigate: any;
};

const FrontPage = () => {
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
      <Text style={{
        fontSize: 20,
        color: '#ffffff',
      }}>Yacht Mappstar</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Front Page')}>
        
      </TouchableOpacity>
    </View>
  );
};

export default FrontPage;
