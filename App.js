import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar,SafeAreaView} from 'react-native'
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreens1 from './screens/SignUpScreens/SignUpScreens1';
import SignUpScreens2 from './screens/SignUpScreens/SignUpScreens2';
import SignUpScreens3 from './screens/SignUpScreens/SignUpScreens3';
import WelcomeTabNavigator from './navigators/WelcomeTabNavigator';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
      <StatusBar backgroundColor={'white'} barStyle="dark-content"/>
      <Stack.Navigator initialRouteName='Welcome'>
         <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
         <Stack.Screen name="SignUpScreen1" component={SignUpScreens1} options={{headerShown: false}} />
        <Stack.Screen name="SignUpScreen2" component={SignUpScreens2} options={{headerShown:false}}/>
        <Stack.Screen name="SignUpScreen3" component={SignUpScreens3} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}