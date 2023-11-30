import DocumentScreen from "./DocumentScreen";
import History from "./History";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function DocumentStack({route}){
    return (
        <Stack.Navigator initialRouteName='DocumentScreen'>
            <Stack.Screen name = "DocumentScreen" component={DocumentScreen} options={{headerShown : false}}/>
            <Stack.Screen name = "History" component={History} options={{headerShown : false}}/>
        </Stack.Navigator>
    )
}