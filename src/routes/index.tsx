import {NavigationContainer} from '@react-navigation/native';
import Stack from './stacks';

const Routes = (setLogIn:any) => {
  console.log(setLogIn, 'route')
  return (
    <NavigationContainer>
      <Stack setLogIn={setLogIn}/>
    </NavigationContainer>
  );
};

export default Routes;
