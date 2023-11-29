import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useWindowDimensions } from "react-native";
import { NativeModules, Platform } from "react-native";
import WeatherWidget from "../components/Weather/WeatherWidget";
import Greeting from "../components/Greeting";
import SprayCycleCard from "../components/Cards/SprayCycleCard";
import UploadDocuments from "../components/Cards/UploadDocuments";
import { useEffect, useState } from "react";
import AddFarmCard from "../components/Cards/AddFarmCard";
import { auth } from "../firebase/firebase";
import axios from 'axios'; // Add this line
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen({ route }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add this line

  const fetchData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const getFarmerURL = `http://192.168.1.3:3001/api/v1/farmers/farmers/uid/${currentUser.uid}`;
        const response = await axios.get(getFarmerURL, {});
        setUser(response.data.farmer);
      } else {
        console.log("No user logged in");
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigation = useNavigation();
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const { StatusBarManager } = NativeModules;
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
      fontSize: 20,
      fontWeight: "500",
    },
    sectionTitleSection: {
      width: windowWidth * 0.9,
      padding: 8,
      marginVertical: 16,
    },
    banner: {
      flexDirection: "row",
      maxWidth: windowWidth * 0.9,
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 6,
      gap: 6,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      {user ? (
        <ScrollView style={{ paddingHorizontal: 8 }}>
          <StatusBar style="auto" />
          <Greeting name={user.firstName} />
          {user.farm ? (
            <>
              <Text>{`welcome back to your farm!`}</Text>
              <View style={styles.sectionTitleSection}>
                <Text style={styles.sectionHeader}>Current Weather</Text>
              </View>
              <WeatherWidget />
              <View style={styles.sectionTitleSection}>
                <Text style={styles.sectionHeader}>Today's Spray Cycle</Text>
              </View>
              <View>
                <SprayCycleCard
                  type={"fertiliser"}
                  spray={{
                    name: "Ferrous sulphate",
                    totalSprays: "1",
                    quantityLitre: "2",
                    quantityAcre: "300",
                  }}
                  count={1}
                />
                <SprayCycleCard
                  type={"fertiliser"}
                  spray={{
                    name: "0-52-34",
                    totalSprays: "2",
                    quantityLitre: "2.5",
                    quantityAcre: "300",
                  }}
                  count={2}
                />
                <SprayCycleCard
                  type={"fertiliser"}
                  spray={{
                    name: "M-45",
                    totalSprays: "1",
                    quantityLitre: "0.5",
                    quantityAcre: "300",
                  }}
                  count={3}
                />
              </View>
            </>
          ) : (
            <View>
              <AddFarmCard
                text="Add Farm"
                icon="add"
                onPress={() => {
                  navigation.navigate("AddFarmForm");
                }}
              />
            </View>
          )}
          <View>
            <View style={styles.banner}>
              <UploadDocuments
                text={
                  "Upload your petiole and soil reports to get more insights"
                }
                icon={null}
                count={1}
                textBtn={"upload"}
              />
              <Image
                source={require("../assets/HomeScreenImages/uploadReports.png")}
              />
            </View>
            <View style={styles.banner}>
              <UploadDocuments
                text={"Upload pictures of your plants and get health reports"}
                icon={null}
                count={2}
                textBtn={"upload"}
              />
              <Image
                source={require("../assets/HomeScreenImages/diseaseDetection.png")}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
