import {View, Text, StyleSheet, ScrollView} from "react-native";
import { useWindowDimensions } from "react-native";
import { COLORS } from "../../constants/theme";
import FutureWeather from "./FutureWeather";
import CurrentWeather from "./CurrentWeather";

export default function WeatherWidget(){
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const styles = StyleSheet.create({
        horizontalScroll : {
            alignItems : 'flex-start',
            justifyContent : 'flex-start',
            columnGap: 8,
            paddingHorizontal : 16,
            paddingVertical : 4,
        },
        smallContainer : {
            flexDirection : "column",
            alignItems : "center",
            justifyContent : "center"
        },
        timeText : {
            fontSize : 14,
            fontWeight : "300",
            marginBottom : 4,
        },
    });
    return(
        <ScrollView contentContainerStyle = {styles.horizontalScroll} horizontal showsHorizontalScrollIndicator = {false}>
            <View style = {styles.smallContainer}>
                <CurrentWeather weatherCondition={"sunny"} flag={"Positive"} temp={"30"} description={"Great Weather for the crops"}/>
            </View>
            <View style = {styles.smallContainer}>
                <Text style = {styles.timeText}>5 pm</Text>
                <FutureWeather weatherCondition={"sunny"} flag={"Positive"}/>
            </View>
            <View style = {styles.smallContainer}>
                <Text style = {styles.timeText}>6 pm</Text>
                <FutureWeather weatherCondition={"cloudy"} flag={"Positive"}/>
            </View>
            <View style = {styles.smallContainer}>
                <Text style = {styles.timeText}>7 pm</Text>
                <FutureWeather weatherCondition={"cloudy-night"} flag={"Positive"}/>
            </View>
        </ScrollView>
    )
}