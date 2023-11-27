import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { COLORS } from "../constants/theme"; // Make sure to replace "your-path-to-COLORS" with the actual path

export default function DiseaseResultScreen({ route }) {
  const { result } = route.params;
  const styles = StyleSheet.create({
    cover: {
      flex: 1,
      justifyContent: "center", // Corrected property name
      alignItems: "center", // Corrected property name
    },
    title: {
      fontSize: 25,
      color: COLORS.primary,
    },
  });

  return (
    <View style={styles.cover}>
      <Text style={styles.title}>{result}</Text>
    </View>
  );
}
