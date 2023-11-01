import { View,Image,Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native"
import { COLORS } from "../../constants/theme";

export default function HollowButton({title, onPress}){

    const windowWidth = useWindowDimensions().width;

    const styles = StyleSheet.create({
        button:{
            borderColor:COLORS.primary,
            borderWidth:2,
            paddingTop: windowWidth * 0.02, // 2% of the window width
            paddingBottom: windowWidth * 0.02, // 2% of the window width
            width: windowWidth/2.2, // or any other fixed width
            borderRadius: 10
        },
        buttonText:{
            textAlign:"center",
            color:COLORS.primary,
            fontSize: 16,
            fontWeight:"800" 
        }
    });

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}