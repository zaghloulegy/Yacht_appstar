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
      }
    }>
      <Text>Profile</Text>
      <Button title='Delete Profile'></Button>
      <Footer />
    </View>
  );
};

export default Profile;
