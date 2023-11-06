import { Text, SafeAreaView, StyleSheet } from "react-native";

export default function DummyScreen(){
    const styles = StyleSheet.create({
        container : {
            flex : 1,
            justifyContent : "center",
            alignItems : "center"
        }
    });
    return (
        <SafeAreaView style = {styles.container}>
            <Text>DummyScreen</Text>
        </SafeAreaView>
    )
}