import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text , TouchableOpacity , useWindowDimensions} from "react-native";
import { COLORS } from "../../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function GeneralButton({icon, text, color, onPress}){
    
    const styles = StyleSheet.create({
        container : {
            backgroundColor : color,
            paddingHorizontal: 16,
            paddingVertical : 8,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius : 10,
            gap : 8,
        },
        text : {
            fontSize : 14,
            color : COLORS.tertiary,
            fontWeight : "600"
        }
    });
    if(icon === null){
        return(
            <TouchableOpacity style = {styles.container} onPress={onPress}>
                <Text style = {styles.text}>{text}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity style = {styles.container} onPress={onPress}>
            <Text style = {styles.text}>{text}</Text>
            <Ionicons name = {icon} size = {16} color = {COLORS.tertiary}/>
        </TouchableOpacity>
    )
}