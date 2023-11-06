import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text , TouchableOpacity , useWindowDimensions} from "react-native";
import { COLORS } from "../../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CardButton({type}){
    const text = type === "feedback" ? "feedback" : type === "check" ? "Mark as Done" : "report";
    const icon = type === "feedback" ? "thumbs-up" : type === "check" ? "checkmark" : "warning";
    const [buttonPressed, setButtonPressed] = useState(false);
    const handleButtonPress = () => {
        if(type === "check"){
            setButtonPressed(!buttonPressed);
        }
      };
    const styles = StyleSheet.create({
        container : {
            flexDirection : "row",
            justifyContent : "center",
            alignItems : "center",
            paddingVertical : 4,
            paddingHorizontal : 8,
            gap : 4,
            borderRadius : 5,
        },
        buttonPressed : {
            backgroundColor : COLORS.primary,
        },
        buttonDefault : {
            backgroundColor : COLORS.gray,
        }
    });
    const buttonStyles = buttonPressed ? styles.buttonPressed : styles.buttonDefault;
    return (
        <TouchableOpacity style = {[styles.container, buttonStyles]} onPress={handleButtonPress} activeOpacity={0.7}>
            <Text>{text}</Text>
            <Ionicons name={icon} size = {12}/>
        </TouchableOpacity>
    )
}