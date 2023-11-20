import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useWindowDimensions } from "react-native";
import { COLORS } from "../../constants/theme";
import FutureWeather from "./FutureWeather";
import CurrentWeather from "./CurrentWeather";
import axios from "axios";
import { useEffect, useState} from "react";

export default function WeatherWidget() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ApiURL = "http://api.weatherapi.com/v1/forecast.json";
    const params = {
      key: "29ddcb6e9b2944c1ab0181359230511",
      q: "20.005411,74.186414",
      days: "1",    
    };

    axios.get(ApiURL, { params })
        .then(response => {
            setData(response.data);
            setLoading(false); // Set loading to false when data is available
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false); // Set loading to false on error
        });
  }, []);

  const styles = StyleSheet.create({
    horizontalScroll: {
      alignItems: "flex-start",
      justifyContent: "flex-start",
      columnGap: 8,
      paddingHorizontal: 16,
      paddingVertical: 4,
    },
    smallContainer: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    timeText: {
      fontSize: 14,
      fontWeight: "300",
      marginBottom: 4,
    },
  });
  if (loading) {
    return <View><Text>Loading...</Text></View>;
    }

  return (
    <ScrollView
      contentContainerStyle={styles.horizontalScroll}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {data && data.current && (
        <View style={styles.smallContainer}>
          <CurrentWeather
            weatherCondition={"sunny"}
            flag={"Positive"}
            temp={data.current.feelslike_c}
            description={"Great Weather for the crops"}
          />
        </View>
      )}
      <View style={styles.smallContainer}>
        <FutureWeather
          weatherCondition={"sunny"}
          flag={"Positive"}
          time={"5pm"}
        />
      </View>
      <View style={styles.smallContainer}>
        <FutureWeather
          weatherCondition={"cloudy"}
          flag={"Positive"}
          time={"6pm"}
        />
      </View>
      <View style={styles.smallContainer}>
        <FutureWeather
          weatherCondition={"cloudy-night"}
          flag={"Positive"}
          time={"7pm"}
        />
      </View>
    </ScrollView>
  );
}
