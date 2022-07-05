import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


type StackParamList = {
  navigate: any;
};

const Footer = () => {
  const navigation = useNavigation<StackParamList>();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleButtonPress = (destination: string) => {
    setMenuOpen(false);
    navigation.navigate(destination);
  };

  const handleSignOut = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    const filterKeys = allKeys.filter((key) => {
      return key.includes('CognitoIdentityServiceProvider');
    });
    await AsyncStorage.multiRemove(filterKeys);
    navigation.navigate('Front Page');
  };

  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }
    }>
      <TouchableOpacity testID='menuID' onPress={() => setMenuOpen(true)}>
        <Ionicons name="menu" size={24} color="#A8DADC" />
      </TouchableOpacity>
      <Modal visible={menuOpen}>
        <View style={footer.view}>
          <TouchableOpacity testID='yourFleet' onPress={() => handleButtonPress('Your Fleet')} style={footer.touchable}>
            <Text>Your Fleet</Text>
          </TouchableOpacity>
        </View>
        <View testID='yourProfile' style={footer.view}>
          <TouchableOpacity onPress={() => handleButtonPress('Profile')} style={footer.touchable}>
            <Text>Profile</Text>
          </TouchableOpacity>
        </View>
        <View testID='yourVoyages' style={footer.view}>
          <TouchableOpacity onPress={() => handleButtonPress('Voyages')} style={footer.touchable}>
            <Text>Voyages</Text>
          </TouchableOpacity>
        </View>
        <View style={footer.view}>
          <TouchableOpacity testID='signout' onPress={() => handleSignOut()} style={footer.touchable}>
            <Text>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View testID='closeMenu' style={footer.view}>
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
    backgroundColor: '#1D3557',
    padding: 50,
    marginBottom: -10,
    height: '190px',
  },
  touchable: {
    backgroundColor: '#A8DADC',
    padding: 26,
    alignItems: 'center',
    borderRadius: 100,
  },
});

export default Footer;
