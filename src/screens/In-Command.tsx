import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

type StackParamList = {
  navigate: any;
};

type RelinquishCommand = {
  relinquish_command: number;
}

const InCommand = (props: any) => {
  const navigation = useNavigation<StackParamList>();

  console.log(props.route.params)

  const handleRelinquishCommand = async () => {
    const relinquishInCommand: number = Date.now();
      const newRelinquishCommand: RelinquishCommand = {
        relinquish_command: relinquishInCommand,
      };
      try {
        console.log('newRelinquishCommand: ', newRelinquishCommand);
        //await AsyncStorage.mergeItem(`voyage:${startTimestamp}`, JSON.stringify(newRelinquishCommand));
        navigation.navigate('Vessel', {'mmsi': props.route.params.mmsi});
      } catch (err) {
        console.log(err);
      }
  }

  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'black'
      }
    }>
      <TouchableOpacity onPress={handleRelinquishCommand}>
        <Text style={{color: 'white',backgroundColor:'red', fontWeight: '600', fontSize: 20,borderWidth: 1, padding: 20,borderRadius: 10, borderColor: '#black', borderBottomWidth: 0, shadowColor: 'rgba(1,1,0,0.1)', shadowOffset: {width: 3, height: 20}, shadowOpacity: 0.8, shadowRadius: 15,elevation: 2,marginLeft: 5, marginRight: 5, marginTop: 10}} >Relinquish Command</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InCommand;
