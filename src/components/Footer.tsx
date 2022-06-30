import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import { Ionicons } from '@expo/vector-icons';

type StackParamList = {
  navigate: any;
};

const Footer = () => {
  const navigation = useNavigation<StackParamList>();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleButtonPress = (destination: string) => {
    setMenuOpen(false);
    navigation.navigate(destination);
  }

  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }
    }>
      <TouchableOpacity onPress={() => setMenuOpen(true)}>
        <Ionicons name="menu" size={24} color="#A8DADC" />
      </TouchableOpacity>

      <Modal visible={menuOpen}>
        <View style={{backgroundColor:'#1D3557', padding:80}}>
          <TouchableOpacity onPress={() => handleButtonPress('Your Fleet')} style={{backgroundColor:'#A8DADC',padding:26,alignItems: 'center',borderRadius:100,}}>
            <Text>Your Fleet</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'#1D3557', padding:80}}>
          <TouchableOpacity onPress={() => handleButtonPress('Profile')} style={{backgroundColor:'#A8DADC',padding:26,alignItems: 'center',borderRadius:100,}}>
          <Text>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'#1D3557', padding:80}}>
          <TouchableOpacity onPress={() => handleButtonPress('Voyages')} style={{backgroundColor:'#A8DADC',padding:26,alignItems: 'center',borderRadius:100,}}>
          <Text>Voyages</Text>
          </TouchableOpacity>
        </View>
        <View style={{backgroundColor:'#1D3557', padding:80}}>
          <TouchableOpacity onPress={() => ('')} style={{backgroundColor:'#A8DADC',padding:26,alignItems: 'center',borderRadius:100,}}>
          <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Footer;