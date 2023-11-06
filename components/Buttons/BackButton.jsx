import React from "react";
import {StyleSheet, View, Text , TouchableOpacity , useWindowDimensions} from "react-native";
import { COLORS } from "../../constants/theme";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function BackButton({text, onPress}){
    const windowWidth = useWindowDimensions().width;

    const styles = StyleSheet.create({
        button : {
            backgroundColor : COLORS.gray,
            borderRadius: 10,
            justifyContent : "center",
            padding : windowWidth * 0.03,
        },
        buttonText : {
            textAlign: "center",
            fontSize: 12,
            fontWeight: "800"
        }
    })
    
    return (
        <TouchableOpacity style = {styles.button} onPress = {onPress}>
            <Ionicons name = "chevron-back-outline" size = {25}/>
        </TouchableOpacity>
    )
}