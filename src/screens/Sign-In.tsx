import {View} from 'react-native';
import React from 'react';
import {withAuthenticator} from '@aws-amplify/ui-react';


const SignIn = () => {
  return (
    <View style={
      {flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }
    }>
    </View>
  );
};

export default withAuthenticator(SignIn);
