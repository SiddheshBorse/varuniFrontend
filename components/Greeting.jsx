import {View, Text, StyleSheet} from "react-native";
import { useWindowDimensions } from "react-native";
import { COLORS } from "../constants/theme"; 

export default function Greeting({name}){
    const windowWidth = useWindowDimensions().width;
    const styles = StyleSheet.create({
        subtitle : {
            fontSize : 16,
            fontWeight : "300"
        },
        heading: {
            fontSize : 24,
            fontWeight : "600"
        },
        container : {
            paddingVertical : 8,
            paddingHorizontal: 8,
            width : windowWidth * 0.9,
        }
    });

    return(
        <View style = {styles.container}>
            <Text style= {styles.heading}>&#128075; Hey, {name}!</Text>
            <Text style = {styles.subtitle}>Here are your daily spray suggestions and weather forecast</Text>
        </View>
    )
}