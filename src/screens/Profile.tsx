import {View, Text, Button} from 'react-native';
import React from 'react';
import Footer from '../components/Footer';

const Profile = () => {
  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#1D3557'
      }
    }>
      <Text style={{color:'#F1FAEE',fontWeight:'600',fontSize: 30}}>Profile</Text>
      <Button title='Delete Profile'></Button>
      <Footer />
    </View>
  );
};

export default Profile;
