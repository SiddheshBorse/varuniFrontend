import { Text, SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../HomeScreen";
import AddFarmForm from "../AddFarmForm";

const Stack = createNativeStackNavigator();

export default function HomeStack({route}){
    return (
        <Stack.Navigator initialRouteName='HomeScreen'>
            <Stack.Screen name = "HomeScreen" component={HomeScreen} options={{headerShown : false}}/>
            <Stack.Screen name = "AddFarmForm" component={AddFarmForm} options={{headerShown : false}}/>
        </Stack.Navigator>
    )
}