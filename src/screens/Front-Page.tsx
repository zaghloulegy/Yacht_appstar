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
        backgroundColor: '#A8DADC',
      }
    }>
      <Text style={{fontSize: 20,color: '#1D3557',}}>Yacht Appstar</Text>
      <Image source={require('../../assets/Loading-Badge.png')} style={{width: 250,height: 250,}}/>
      <TouchableOpacity onPress={() => navigation.navigate('Your Fleet')}>
        <Text style={{borderWidth: 0.5, padding: 20,backgroundColor: '#E63946', borderRadius: 100, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15,elevation: 2,marginLeft: 5, marginRight: 5, marginTop: 10, color:'white', fontSize:25,}}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FrontPage;
