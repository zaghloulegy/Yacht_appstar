import {View, Text, TouchableOpacity, Image} from 'react-native';
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
        backgroundColor: '#A8DADC'
      }
    }>
      <Text style={{fontSize: 20,color: '#1D3557',}}>Yacht Appstar</Text>
      <Image source={require('../../assets/Loading-Badge.png')} style={{width: 250,height: 250,}}/>
      <TouchableOpacity onPress={() => navigation.navigate('Your Fleet')}>
        <Text style={{backgroundColor:'#E63946',padding:10,alignItems: 'center',borderRadius:100,color:'#F1FAEE',}}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FrontPage;
