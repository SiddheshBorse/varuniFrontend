import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignUpScreens1 from '../screens/SignUpScreens/SignUpScreens1';
import SignUpScreens2 from '../screens/SignUpScreens/SignUpScreens2';
import SignUpScreens3 from '../screens/SignUpScreens/SignUpScreens3';

const Tab = createBottomTabNavigator();

export default function WelcomeTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="SignUpScreen1" component={SignUpScreens1} options={{headerShown: false}} />
      <Tab.Screen name="SignUpScreen2" component={SignUpScreens2} options={{headerShown:false}}/>
      <Tab.Screen name="SignUpScreen3" component={SignUpScreens3} options={{headerShown:false}}/>
    </Tab.Navigator>
  );
}
