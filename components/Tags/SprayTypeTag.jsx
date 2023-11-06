import React from "react";
import {StyleSheet, View, Text , TouchableOpacity , useWindowDimensions} from "react-native";
import { COLORS } from "../../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SprayTypeTag({type}){
    const icon = type === "pesticide" ? "bug" : "leaf";
    const text = type === "pesticide" ? "Pesticide" : "Fertiliser";
    const tagColor = type === "pesticide" ? COLORS.blue: COLORS.primary;
    const styles = StyleSheet.create({
        container : {
            padding : 8,
            flexDirection : "row",
            gap : 2,
            alignItems : "center",
            justifyContent : "center",
            backgroundColor : tagColor,
            width : 100,
            borderRadius : 25
        },
        text : {
            fontSize : 12,
            color : "#FFF",
            fontWeight : "600"
        }
    });

    return(
        <View style = {[styles.container, { color : {tagColor}}]}>
            <Ionicons name = {icon} size = {12} color = {"#FFF"}/>
            <Text style = {styles.text}>{text}</Text>
        </View>
    )
}