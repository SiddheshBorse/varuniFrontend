import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View, StatusBar,SafeAreaView} from 'react-native'
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreens1 from './screens/SignUpScreens/onboardingInfo/SignUpScreens1';
import SignUpScreens2 from './screens/SignUpScreens/onboardingInfo/SignUpScreens2';
import SignUpScreens3 from './screens/SignUpScreens/onboardingInfo/SignUpScreens3';
import WelcomeTabNavigator from './navigators/WelcomeTabNavigator';
import JoinUs from './screens/SignUpScreens/JoinUs';
import PersonalForm from './screens/SignUpScreens/PersonalForm';
import SignInScreen from './screens/SignInScreens/SignInScreen';
import AppScreen from './screens/AppScreen';


const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
      <StatusBar backgroundColor={'white'} barStyle="dark-content"/>
      <Stack.Navigator initialRouteName='AppScreen' >
         <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}} />
         <Stack.Screen name="SignUpScreen1" component={SignUpScreens1} options={{headerShown: false}} />
        <Stack.Screen name="SignUpScreen2" component={SignUpScreens2} options={{headerShown:false}}/>
        <Stack.Screen name="SignUpScreen3" component={SignUpScreens3} options={{headerShown:false}}/>
        <Stack.Screen name="JoinUs" component={JoinUs} options={{headerShown:false}}/>
        <Stack.Screen name="PersonalInfoSignUp" component={PersonalForm} options={{headerShown:false}}/>
        <Stack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown:false}}/>
        <Stack.Screen name="AppScreen" component={AppScreen} options={{headerShown:false,stackPresentation: 'replace'}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}