import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

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
        <View style={footer.view}>
          <TouchableOpacity onPress={() => handleButtonPress('Your Fleet')} style={footer.touchable}>
            <Text>Your Fleet</Text>
          </TouchableOpacity>
        </View>
        <View style={footer.view}>
          <TouchableOpacity onPress={() => handleButtonPress('Profile')} style={footer.touchable}>
          <Text>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={footer.view}>
          <TouchableOpacity onPress={() => handleButtonPress('Voyages')} style={footer.touchable}>
          <Text>Voyages</Text>
          </TouchableOpacity>
        </View>
        <View style={footer.view}>
          <TouchableOpacity onPress={() => ('')} style={footer.touchable}>
          <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={footer.view}>
          <TouchableOpacity onPress={() => setMenuOpen(false)} style={footer.touchable}>
          <Entypo name="cross" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const footer = StyleSheet.create({
  view: {
    backgroundColor:'#1D3557', 
    padding:50,
  },
  touchable: {
    backgroundColor:'#A8DADC',
    padding:26,
    alignItems: 'center',
    borderRadius:100,
  }
});

export default Footer;