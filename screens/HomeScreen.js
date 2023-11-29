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
import { NativeModules } from "react-native";
import WeatherWidget from "../components/Weather/WeatherWidget";
import Greeting from "../components/Greeting";
import SprayCycleCard from "../components/Cards/SprayCycleCard";
import UploadDocuments from "../components/Cards/UploadDocuments";
import { useEffect, useState } from "react";
import AddFarmCard from "../components/Cards/AddFarmCard";
import { auth } from "../firebase/firebase";
import axios from "axios";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback } from "react";

export default function HomeScreen({ route }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const isFocused = useIsFocused();
  const [sprays, setSprays] = useState(null);

  const fetchData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const getFarmerURL = `http://192.168.1.6:3001/api/v1/farmers/farmers/uid/${currentUser.uid}`;
        const response = await axios.get(getFarmerURL, {});
        setUser(response.data.farmer);
      } else {
        console.log("No user logged in");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      console.error("Axios request details:", error.config);
    } finally {
      setLoading(false);
    }
  };

  const fetchSprays = async () => {
    try {
      if (user && user.farm) {
        const getSprayURL = `http://192.168.1.6:3001/api/v1/farm/farms/${user.farm}/sprays/day`;
        const response = await axios.get(getSprayURL, {});

        console.log(response);
        if (response.status === 200) {
          const spraysData = response.data.sprays[0] || [];
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
          console.error(`Error fetching sprays. Status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      console.error("Axios request details:", error.config);
    } finally {
      setLoading(false);
    }
  };

  const getProductDetails = async (productId) => {
    try {
      const getProductURL = `http://192.168.1.6:3001/api/v1/product/products/${productId}`;
      const response = await axios.get(getProductURL);
      if (response.status === 200) {
        return response.data;
      } else {
        console.error(
          `Error fetching product details. Status: ${response.status}`
        );
        return {};
      }
    } catch (error) {
      console.error("Error fetching product details:", error.message);
      console.error("Axios request details:", error.config);
      return {};
    }
  };

  useEffect(() => {
    console.log("Is focused:", isFocused);
    const fetchDataAndSprays = async () => {
      try {
        setLoading(true);
        if (isFocused) {
          await fetchData();
          await fetchSprays();
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDataAndSprays();
  }, [isFocused]);

  useFocusEffect(
    useCallback(() => {
      const fetchDataAndSprays = async () => {
        try {
          setLoading(true);
          await fetchData();
          await fetchSprays();
        } finally {
          setLoading(false);
        }
      };
      fetchDataAndSprays();
    }, [])
  );
  

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
          {loading ? (
            <View style={styles.container}>
              <Text>Loading...</Text>
            </View>
          ) : (
            <>
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
                  {sprays && sprays.length > 0 ? (
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
            </>
          )}
        </ScrollView>
      ) : (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
