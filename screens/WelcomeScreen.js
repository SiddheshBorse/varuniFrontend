import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import HollowButton from "../components/login/HollowButton";
import FillButton from "../components/login/FillButton";
import { COLORS } from "../constants/theme";

export default function WelcomeScreen() {
    return (
        <View style={styles.cover}>
            <Image style={styles.image} source={require("../assets/loginImages/loginImage5.png")} />
            <View style={styles.textCover}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <HollowButton title={"Sign Up"} />
                <FillButton title={"Log In"} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    cover: {
        flex: 1,
    },
    title: {
        fontSize: 40,
        color: COLORS.primary,
        fontFamily:"Manrope"
    },
    paragraph: {
        fontSize: 20,
    },
    image: {
        width: "100%",
        aspectRatio: 32 / 18,
        height: "30%",
        
    },
    textCover: {
        padding: "2%",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16, // Adjust as needed for spacing
    },
});
