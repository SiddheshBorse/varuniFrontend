import { StyleSheet, Text, View} from 'react-native';
import { useWindowDimensions } from "react-native";
import {COLORS} from "../../constants/theme";
import FutureWeather from './FutureWeather';


export default function CurrentWeather({weatherCondition, flag, description, temp}){
    const windowWidth = useWindowDimensions().width;
    let colorStyle;
    if(flag === 'Positive') colorStyle = COLORS.blue
    else if (flag === 'Warning') colorStyle = COLORS.yellow
    else colorStyle = COLORS.red
    const styles = StyleSheet.create({
        container : {
            flexDirection : 'row',
            backgroundColor : COLORS.secondary,
            padding : 16,
            gap : 16,
            borderRadius : 25,
            justifyContent : "center",
            alignItems : 'center'
        },
        weatherIcon : {
            alignItems : 'center',
            justifyContent : 'center',
            backgroundColor : colorStyle,
            opacity : 0.3,
            borderRadius : 15,
        },
        weatherDescription : {
            flexDirection : 'column',
            justifyContent: 'center',
            alignItems: "flex-start",
            width : windowWidth * 0.35,
        },
        temperature : {
            fontSize : 26,
            fontWeight : "400",
            marginBottom : 4,
        },
        conditionText : {
            fontSize : 18,
            fontWeight : "600",
            color : colorStyle,
            marginBottom : 2,
        },
        suggestionText : {
            fontSize : 12,
            fontWeight : "200"
        }
    });
    return(
        <View style = {styles.container}>
            <View>
                <FutureWeather weatherCondition={ weatherCondition} flag = {flag}/>
            </View>
            <View style = {styles.weatherDescription}>
                <Text style = {styles.temperature}>{temp}&deg; C</Text>
                <Text style = {styles.conditionText}>{weatherCondition}</Text>
                <Text style = {styles.suggestionText}>{description}</Text>
            </View>
        </View>
    )
}