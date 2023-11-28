import React from "react";
import {StyleSheet, View, Text , TouchableOpacity , useWindowDimensions} from "react-native";
import { COLORS } from "../../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AddFarmCard({text, icon, onPress}){
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const styles = StyleSheet.create({
        card : {
            backgroundColor : COLORS.purple,
            width: windowWidth - windowWidth * 0.06,
            paddingHorizontal: windowWidth * 0.025,
            paddingVertical : windowHeight * 0.025,
            borderRadius: 10,
            justifyContent : "space-between",
            alignItems: 'flex-start',
            flexDirection: "row",
            gap : windowWidth * 0.3,
            marginVertical: windowHeight * 0.005
        },
        cardText : { 
            color:'white',
            textAlign: "center",
            fontSize: 20,
            fontWeight: "400"
        }
    });

    return (
        <TouchableOpacity onPress={onPress}>
            <View style = {styles.card}>
                <Text style = {styles.cardText}>{text}</Text>
                <Ionicons name = {icon} size = {25}/>
            </View>
        </TouchableOpacity>
    )
}