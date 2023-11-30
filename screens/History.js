import { auth } from "../firebase/firebase";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import axios from "axios";
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
import SprayCycleCard from "../components/Cards/SprayCycleCard";

export default function History({route}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const isFocused = useIsFocused();
    const [sprays, setSprays] = useState(null);
    const navigation = useNavigation();
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const { StatusBarManager } = NativeModules;
    const fetchData = async () => {
        try {
          const currentUser = auth.currentUser;
      
          if (currentUser) {
            const getFarmerURL = `http://192.168.1.6:3001/api/v1/farmers/farmers/uid/${currentUser.uid}`;
            const farmerResponse = await axios.get(getFarmerURL, {});
            setUser(farmerResponse.data.farmer);
      
            // Check if route.params.date is a string and convert it to a Date object
            const date = typeof route.params.date === 'string' ? new Date(route.params.date) : route.params.date;
      
            // Fetch sprays data
            if (farmerResponse.data.farmer && farmerResponse.data.farmer.farm) {
              const getSprayURL = `http://192.168.1.6:3001/api/v1/farm/farms/${farmerResponse.data.farmer.farm}/sprays/specific/${date.toISOString()}`;
              console.log(getSprayURL);
              console.log(date);
      
              const sprayResponse = await axios.get(getSprayURL);
              console.log(sprayResponse.data);
      
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
        console.log("useEffect triggered");
        const fetchDataAndSprays = async () => {
          console.log("Fetching data and sprays...");
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
        sectionTitle : {
            fontSize : 42,
            fontWeight: "700",
            marginBottom: 8
        },
      });
      return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.sectionTitleSection, { alignItems: "center" }]}>
        <Text style={styles.sectionTitle}>{route.params.date}</Text>
        <Text style={styles.sectionDescription}>Spraying History for the last 15 days</Text>
      </View>
          {user? (
            <ScrollView style={{ paddingHorizontal: 8 }}>
              <StatusBar style="auto" />
                <>
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
            </ScrollView>
          ) : (
            <View style={styles.container}>
              <Text>Loading...</Text>
            </View>
          )}
        </SafeAreaView>
      );
}