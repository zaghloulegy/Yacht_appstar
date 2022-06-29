import {View, Button, Modal} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

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
      
      <Button title="menu" onPress={() => setMenuOpen(true)}></Button>

      <Modal visible={menuOpen}>
        <View>
          <Button title="Your Fleet" onPress={() => handleButtonPress('Your Fleet')}></Button>
          <Button title="Profile" onPress={() => handleButtonPress('Profile')}></Button>
          <Button title="Voyages" onPress={() => handleButtonPress('Voyages')}></Button>
          <Button title="Sign Out" onPress={() => ('')}></Button>
        </View>
      </Modal>
    </View>
  );
};

export default Footer;