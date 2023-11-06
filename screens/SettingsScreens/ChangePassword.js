import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function ChangePassword({navigation}) {
  return (
    <SafeAreaView style = {{flex  : 1}}>
      <View style={styles.container}>
      <Text style = {{fontWeight : "800"}}>Change Password</Text>
      <StatusBar style="auto" />
    </View>
    </SafeAreaView>
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