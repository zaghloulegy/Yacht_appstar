import AsyncStorage from '@react-native-async-storage/async-storage';

const clearData = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    const filterKeys = allKeys.filter((key) => {
      return key.includes('vessel');
    });
    await AsyncStorage.multiRemove(allKeys);
  } catch (err) {
    console.log('err: ', err);
  }
};

export default clearData;