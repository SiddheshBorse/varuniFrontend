import { Text, SafeAreaView, StyleSheet, useWindowDimensions, View } from "react-native";
import GeneralButton from "../components/Buttons/GeneralButton";
import { COLORS } from "../constants/theme";
import CameraScreen from "./CameraScreen"
import { useNavigation } from "@react-navigation/native";
export default function CameraWelcomScreen({navigation}){
    const styles = StyleSheet.create({
        container : {
            flex : 1,
            justifyContent : "center",
            alignItems : "center",
        },
        buttonContainer : {
            justifyContent : "center",
            alignItems : "center",
            padding : 16,
            borderRadius : 15,
            backgroundColor : COLORS.gray,
            gap : 8,

        }
    });
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {styles.buttonContainer}>
                <GeneralButton text = {"Take a new picture "} color={COLORS.primary} icon={"camera"} onPress = {() => navigation.navigate("Device Camera")}/>
                <GeneralButton text = {"Upload from device"} color = {COLORS.blue} icon = {"cloud-upload"} onPress = {() => navigation.navigate("Device Gallery")}/>
            </View>
        </SafeAreaView>
    )
}