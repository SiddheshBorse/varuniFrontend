import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, SafeAreaView } from "react-native";
import SettingsScreens from "../screens/SettingsScreens/SettingsScreen";
import ChangePassword from "../screens/SettingsScreens/ChangePassword";
import ChangeUsername from "../screens/SettingsScreens/ChangeUsername";
import DeleteAccount from "../screens/SettingsScreens/DeleteAccount";
import EditDetails from "../screens/SettingsScreens/EditDetails";
import Logout from "../screens/SettingsScreens/Logout";


export default function Settings(){
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator initialRouteName='settings'>
            <Stack.Screen name = "settings" component = {SettingsScreens} options={{headerShown : false}}/>
            <Stack.Screen name = "ChangePassword" component={ChangePassword} />
            <Stack.Screen name = "ChangeUsername" component={ChangeUsername}/>
            <Stack.Screen name = "DeleteAccount" component={DeleteAccount}/>
            <Stack.Screen name = "EditDetails" component={EditDetails}/>
            <Stack.Screen name = "Logout" component={Logout}/>
        </Stack.Navigator>
    )
}