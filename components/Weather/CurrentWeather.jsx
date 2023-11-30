import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useWindowDimensions } from "react-native";
import { COLORS } from "../../constants/theme";

export default function CurrentWeather({
  weatherCondition,
  flag,
  description,
  temp,
  iconSrc,
}) {
  const windowWidth = useWindowDimensions().width;
  let colorStyle, mainColor;
  if (flag === "Positive") {
    colorStyle = COLORS.blueSecondary;
    mainColor = COLORS.blue;
  } else if (flag === "Warning") {
    colorStyle = COLORS.yellowSecondary;
    mainColor = COLORS.yellow;
  } else {
    colorStyle = COLORS.redSecondary;
    mainColor = COLORS.red;
  }

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      backgroundColor: COLORS.secondary,
      padding: 19,
      gap: 19,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    weatherIcon: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colorStyle,
      opacity: 0.3,
      borderRadius: 15,
    },
    weatherDescription: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      width: windowWidth * 0.35,
    },
    temperature: {
      fontSize: 26,
      fontWeight: "400",
      marginBottom: 4,
    },
    conditionText: {
      fontSize: 18,
      fontWeight: "600",
      color: COLORS.blue,
      marginBottom: 2,
    },
    suggestionText: {
      fontSize: 12,
      fontWeight: "200",
    },
    iconImage: {
      width: 52,
      height: 52,
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.container, { backgroundColor: colorStyle }]}>
      <Image
  source={{ uri: iconSrc }}
  style={{ width: 52, height: 52, tintColor: COLORS.blue }}
/>
      </View>
      <View style={styles.weatherDescription}>
        <Text style={styles.temperature}>{temp}&deg; C</Text>
        <Text style={styles.conditionText}>{weatherCondition}</Text>
        <Text style={styles.suggestionText}>{description}</Text>
      </View>
    </View>
  );
}
