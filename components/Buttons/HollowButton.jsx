import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { COLORS } from "../../constants/theme";

export default function HollowButton({ title, onPress, style, disabled }) {

    const windowWidth = useWindowDimensions().width;

    const buttonStyles = StyleSheet.create({
        button: {
            borderColor: disabled ? COLORS.gray : COLORS.primary, // Adjust border color based on disabled prop
            borderWidth: 2,
            paddingTop: windowWidth * 0.02,
            paddingBottom: windowWidth * 0.02,
            width: windowWidth / 2.2,
            borderRadius: 10,
            opacity: disabled ? 0.5 : 1,
        },
        buttonText: {
            textAlign: "center",
            color: disabled ? COLORS.gray : COLORS.primary, // Adjust text color based on disabled prop
            fontSize: 18,
            fontWeight: "800"
        }
    });

    return (
        <TouchableOpacity
            style={[buttonStyles.button, style]}
            onPress={disabled ? null : onPress} // Disable onPress when disabled is true
            activeOpacity={0.7} // Adjust opacity for touch feedback
        >
            <Text style={buttonStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}
