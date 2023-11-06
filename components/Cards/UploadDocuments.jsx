import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text , TouchableOpacity , useWindowDimensions} from "react-native";
import { COLORS } from "../../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import GeneralButton from "../Buttons/GeneralButton";

export default function UploadDocuments({text , icon, count, textBtn}){
    const windowWidth = useWindowDimensions().width;
    const colorBG = count % 2 === 0 ? COLORS.purpleBackground : COLORS.secondary;
    const color = count % 2 === 0 ? COLORS.purple : COLORS.primary;
    const styles = StyleSheet.create({
        container : {
            paddingHorizontal : 16,
            paddingVertical : 24,
            backgroundColor : colorBG,
            flexDirection : "row",
            justifyContent: "space-between",
            alignItems : "center",
            borderRadius : 15,
            minWidth : windowWidth * 0.7,
        },
        textContainer : {
            maxWidth : "60%",
            fontSize : 16,
            fontWeight : "300"
        },
    });
    return(
        <View style = {styles.container}>
            <Text style = {styles.textContainer}>{text}</Text>
            <GeneralButton text = {textBtn} color = {color} icon = {icon}/>
        </View>
    )
}