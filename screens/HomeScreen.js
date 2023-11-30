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
import axios from "axios";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function HomeScreen({ route }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [sprays, setSprays] = useState(null);

  const fetchData = async () => {
    try {
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        // Fetch farmer data
        const getFarmerURL = `http://192.168.1.6:3001/api/v1/farmers/farmers/uid/${currentUser.uid}`;
        const farmerResponse = await axios.get(getFarmerURL, {});
        setUser(farmerResponse.data.farmer);
  
        // Fetch sprays data
        if (farmerResponse.data.farmer && farmerResponse.data.farmer.farm) {
          const getSprayURL = `http://192.168.1.6:3001/api/v1/farm/farms/${farmerResponse.data.farmer.farm}/sprays/day`;
          const sprayResponse = await axios.get(getSprayURL, {});
  
          if (sprayResponse.status === 200) {
            const spraysData = sprayResponse.data.sprays[0] || [];
            const spraysWithProductDetails = await Promise.all(
              spraysData.map(async (spray) => {
                const productDetails = await getProductDetails(spray.product);
                return {
                  ...spray,
                  productName: productDetails.productName,
                };
              })
            );
            setSprays(spraysWithProductDetails);
          } else {
            console.error(`Error fetching sprays. Status: ${sprayResponse.status}`);
          }
        }
      } else {
        console.log("No user logged in");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      console.error("Axios request details:", error.config);
    }
  };
  const getProductDetails = async (productId) => {
    try {
      const getProductURL = `http://192.168.1.6:3001/api/v1/product/products/${productId}`;
      const response = await axios.get(getProductURL);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(`Error fetching product details. Status: ${response.status}`);
        return {};
      }
    } catch (error) {
      console.error("Error fetching product details:", error.message);
      console.error("Axios request details:", error.config);
      return {};
    }
  };
  useEffect(() => {
    const fetchDataAndSprays = async () => {
      if (isFocused) {
        try {
          await fetchData();
        } catch (error) {
          console.error("Error fetching data and sprays:", error.message);
        }
      }
    };
  
    fetchDataAndSprays();
    setLoading(true);
  }, [isFocused]);

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
      {user && loading ? (
        <ScrollView style={{ paddingHorizontal: 8 }}>
          <StatusBar style="auto" />
          <Greeting name={user.firstName} />
          {user.farm ? (
            <>
              <View style={styles.sectionTitleSection}>
                <Text style={styles.sectionHeader}>Current Weather</Text>
              </View>
              <WeatherWidget />
              <View style={styles.sectionTitleSection}>
                <Text style={styles.sectionHeader}>Today's Spray Cycle</Text>
              </View>
              <View>
                {sprays !== null ? (
                  sprays.map((spray, index) => (
                    <SprayCycleCard
                      key={index}
                      type={"fertiliser"}
                      spray={{
                        name: spray.productName,
                        totalSprays: "1",
                        quantityLitre: spray.quantity,
                        quantityAcre: "300",
                      }}
                      count={index + 1}
                    />
                  ))
                ) : (
                  <Text>No sprays available</Text>
                )}
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
