import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { useWindowDimensions } from "react-native";

export default function DeadRoundButton({ title, onPress }) {
  const windowWidth = useWindowDimensions().width;

  const styles = StyleSheet.create({
    button: {
      backgroundColor: COLORS.secondary,
      width: windowWidth * 0.15, // Set width and height to be equal for a circle
      height: windowWidth * 0.15,
      borderRadius: (windowWidth * 0.2) / 2, // Set border radius to half of the width for a circle
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      textAlign: "center",
      color: COLORS.primary,
      fontSize:18,
      fontWeight: "800",
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}
