import { Text, SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import CameraComponent from "../../components/Camera/CameraComponent";
export default function DocumentScreen(){
    const styles = StyleSheet.create({
        container : {
            flex : 1,
            justifyContent : "center",
            alignItems : "center",
        }
    });
    return (
        <SafeAreaView style = {styles.container}>
            <CameraComponent/>
        </SafeAreaView>
    )
}