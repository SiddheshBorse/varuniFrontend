import { Text, SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraWelcomScreen from "./cameraWelcomeScreen";
import CameraScreen from "./CameraScreen"
import GalleryScreen from "./GalleryScreen";
import DiseaseResultScreen from "./DiseaseResultScreen";

const Stack = createNativeStackNavigator();
export default function DiseaseDetection(){
    
    const styles = StyleSheet.create({
        container : {
            flex : 1,
            justifyContent : "center",
            alignItems : "center",
        }
    });
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Disease Detection" component={CameraWelcomScreen} options={{headerShown : false}}/>
            <Stack.Screen name = "Device Camera" component={CameraScreen} />
            <Stack.Screen name = "Device Gallery" component={GalleryScreen} />
            <Stack.Screen name = "Disease Result" component={DiseaseResultScreen} />
        </Stack.Navigator>
    )
}