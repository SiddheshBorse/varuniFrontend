import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import HollowButton from "../components/Buttons/HollowButton";
import FillButton from "../components/Buttons/FillButton";
import { COLORS } from "../constants/theme";
import { useWindowDimensions } from "react-native";

export default function WelcomeScreen({navigation}) {
    const windowWidth = useWindowDimensions().width;
    const styles = StyleSheet.create({
        cover: {
            flex: 1,
        },
        title: {
            fontSize: 25,
            color: COLORS.primary,
        },
        paragraph: {
            fontSize: 16
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
            bottom: 20,
            left: 0,
            right: 0,
            paddingLeft:10 , // Adjust as needed for spacing
            paddingRight:10 , // Adjust as needed for spacing
        },
        button:{
            width:windowWidth/2.2
        }
    });
    
    return (
        <View style={styles.cover}>
            <Image style={styles.image} source={require("../assets/loginImages/loginImage5.png")} />
            <View style={styles.textCover}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.paragraph}>
                Welcome to the Varuni! Revolutionize your grape farming experience with our cutting-edge solution. Discover the perfect balance between pest control and sustainability for healthier, more bountiful harvests. Let's get started on a journey towards thriving vineyards!
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <HollowButton style={styles.button} title={"Sign Up"} onPress={() => navigation.navigate("SignUpScreen1")} />
                <FillButton style={styles.button}  title={"Log In"} />
            </View>
        </View>
    );
}

