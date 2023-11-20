import { StyleSheet, View, Text } from 'react-native';
import { useWindowDimensions } from "react-native";
import { COLORS } from "../../constants/theme"
import Ionicons from "@expo/vector-icons/Ionicons"
import Icons from "@expo/vector-icons/MaterialIcons";


export default function FutureWeather({ weatherCondition, flag , time}) {
  weatherCondition = weatherCondition === null ? "sync_problem" : weatherCondition;
  flag = flag === null ? "Negative" : flag;

  // Function to load the image, falling back to 'sync_problem' if the original can't be retrieved
  const getImageSource = () => {
    let imagePath;
    if (flag === 'Positive') {
      imagePath = `${weatherCondition}Positive.png`;
    } else if (flag === 'Warning') {
      imagePath = `${weatherCondition}Warning.png`;
    } else {
      imagePath = `${weatherCondition}Negative.png`;
    }
    return imagePath;
  };

  let colorStyle, mainColor;
  if (flag === 'Positive'){
    colorStyle = COLORS.blueSecondary;
    mainColor = COLORS.blue
  }
  else if (flag === 'Warning'){
    colorStyle = COLORS.yellowSecondary;
    mainColor = COLORS.yellow;
  }
  else{
    colorStyle = COLORS.redSecondary;
    mainColor = COLORS.red;
  }

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      justifyContent: 'center',
      alignContent: 'center',
      borderRadius: 10,
      backgroundColor : colorStyle
    },
    img: {
      width: 32,
      height: 32,
    },
    timeText : {
      fontSize : 14,
      fontWeight : "300",
      marginBottom : 4,
  },
  });

  const windowWidth = useWindowDimensions().width;
  //<Ionicons name = {weatherCondition} size={52} color= {mainColor}/>
  const weatherName = "material-symbol-outline" + weatherCondition
  return (
    <View>
        <Text style = {styles.timeText}>{time}</Text>
        <View style={styles.container}><Ionicons name = {weatherCondition} size={52} color= {mainColor}/></View>
    </View>
  )
}
