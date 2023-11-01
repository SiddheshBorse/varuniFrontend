import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, Vie, StatusBar,SafeAreaView} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import WelcomeScreen from './screens/WelcomeScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
      <StatusBar backgroundColor={'white'} barStyle="dark-content"/>
      <Stack.Navigator initialRouteName='Home'>
         <Stack.Screen name="Home" component={WelcomeScreen} options={{headerShown: false}} />
         <Stack.Screen name="About" component={AboutScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}