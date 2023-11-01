import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { COLORS } from "../../constants/theme";

export default function FillButton({ title, onPress, style, disabled }) {
    const windowWidth = useWindowDimensions().width;

    const buttonStyles = StyleSheet.create({
        button: {
            backgroundColor: disabled ? COLORS.gray : COLORS.primary,
            paddingTop: windowWidth * 0.02,
            paddingBottom: windowWidth * 0.02,
            borderRadius: 10,
            opacity: disabled ? 0.5 : 1,
            justifyContent:'center'
        },
        buttonText: {
            textAlign: "center",
            color: COLORS.tertiary,
            fontSize: 20,
            fontWeight: "800"
        }
    });

    return (
        <TouchableOpacity
            style={[buttonStyles.button, style]}
            onPress={disabled ? null : onPress}
            activeOpacity={0.7}
            disabled={disabled}
        >
            <Text style={buttonStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};
