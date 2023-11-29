import { Button, SafeAreaView, StyleSheet, Text, View, useWindowDimensions , ScrollView, NativeModules} from 'react-native';
import SettingsCard from "../../components/Cards/settingsCards";
import { useNavigation } from '@react-navigation/native';

export default function SettingsScreens({navigation}) {
    const windowWidth = useWindowDimensions().width;
    const {StatusBarManager} = NativeModules;
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        },
        section : {
          paddingLeft: windowWidth * 0.02,
          paddingTop: windowWidth * 0.02,
          alignItems: 'center',
          justifyContent: 'center',

        },
        sectionTitle : {
            fontSize : 42,
            fontWeight: 700,
            marginTop: 8,
            marginBottom: 8
        },
      });
  return (
    <SafeAreaView style = {[{flex  : 1}, {backgroundColor : '#FFF'}, {marginTop : StatusBarManager.HEIGHT}]}>
      <ScrollView>
      <View style = { styles.section}>
        <Text style = {[ styles.sectionTitle]}>Settings</Text>
      </View>
      <View style = {styles.section}>
        <SettingsCard text = "Change Password" icon = "lock-closed" onPress={() => navigation.navigate('ChangePassword')}/>
        <SettingsCard text = "Change Username" icon = "person" onPress={() => navigation.navigate('ChangeUsername')}/>
        <SettingsCard text = "Edit Details" icon = "create" onPress={() => navigation.navigate('EditDetails')}/>
        <SettingsCard text = "Delete Account" icon = "trash" onPress={() => navigation.navigate('DeleteAccount')}/>
        <SettingsCard text = "Log Out" icon = "log-out" onPress={() => navigation.navigate('Logout')}/>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}