import React from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useWindowDimensions } from "react-native";
import { NativeModules } from "react-native";
import { COLORS } from "../constants/theme";
import GeneralButton from "../components/Buttons/GeneralButton";
import { useNavigation } from "@react-navigation/native";
import History from "./History";
import { format, addDays, set, add } from "date-fns";
export default function DocumentScreen() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const StatusBarManager = NativeModules;
  const navigation = useNavigation();

  const getLast15Dates = () => {
    const dates = [];
  
    for (let i = 15; i >= 1; i--) {
      const currentDate = set(new Date(), {
        hours: 23,
        minutes: 15,
        seconds: 30,
        milliseconds: 0,
      });
  
      const formattedDate = format(add(currentDate, { days: -i }), "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
      dates.push(formattedDate);
    }
  
    return dates;
  };
  const handleShowHistory = (date) => {
    navigation.navigate("History", { date });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
      marginTop: StatusBarManager.HEIGHT,
      paddingVertical: windowHeight * 0.03,
    },
    sectionHeader: {
      fontSize: 16,
      fontWeight: "500",
      marginVertical: 4,
    },
    sectionTitleSection: {
      width: windowWidth * 0.9,
      padding: 8,
      marginHorizontal: 16,
      marginVertical: 8,
    },
    section: {
      padding: windowWidth * 0.01,
      alignItems: "flex-start",
      justifyContent: "center",
      width: windowWidth * 0.9,
    },
    sectionTitle: {
      fontSize: 42,
      fontWeight: "700",
      marginTop: 8,
      marginBottom: 8,
    },
    sectionDescription: {
      fontSize: 16,
      fontWeight: "300",
    },
    uploadSection: {
      padding: 16,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      width: windowWidth * 0.9,
      justifyContent: "space-between",
      marginBottom: 20,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.sectionTitleSection, { alignItems: "center" }]}>
        <Text style={styles.sectionTitle}>History</Text>
        <Text style={styles.sectionDescription}>
          Spraying History for the last 15 days
        </Text>
      </View>
      <ScrollView>
        <View style={styles.section}>
          {getLast15Dates().map((date, index) => (
            <View
              key={index}
              style={[
                styles.uploadSection,
                { backgroundColor: COLORS.secondary },
              ]}>
              <Text>{date}</Text>
              <GeneralButton
                text={"Show History"}
                icon={"cloud-upload"}
                color={COLORS.primary}
                onPress={() => handleShowHistory(date)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
