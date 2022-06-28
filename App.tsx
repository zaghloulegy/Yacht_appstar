import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';
import '@aws-amplify/ui-react/styles.css';
import Loading from './src/components/Loading';


// eslint-disable-next-line require-jsdoc
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Loading />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
