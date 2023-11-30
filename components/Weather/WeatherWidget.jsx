import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useWindowDimensions } from "react-native";
import { COLORS } from "../../constants/theme";
import FutureWeather from "./FutureWeather";
import CurrentWeather from "./CurrentWeather";
import axios from "axios";
import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [futureWeatherConditions, setFutureWeatherConditions] = useState([]);

  useEffect(() => {
    const ApiURL = "http://api.weatherapi.com/v1/forecast.json";
    const params = {
      key: "29ddcb6e9b2944c1ab0181359230511",
      q: "20.005411,74.186414",
      days: "1",
    };

    axios
      .get(ApiURL, { params })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        console.log(response);
        console.log(`https:${data.current.condition.icon}`);
         // Extracting weather conditions for the next 3 hours
         const hourlyForecast = response.data.forecast.forecastday[0].hour;
         const next3HoursWeather = hourlyForecast.slice(0, 3);
         console.log(next3HoursWeather);
 
         // Updating the state with the future weather conditions
         setFutureWeatherConditions(next3HoursWeather);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const getFutureTime = (hoursToAdd) => {
    const now = new Date();
    now.setHours(now.getHours() + hoursToAdd);
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

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
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.horizontalScroll}
      horizontal
      showsHorizontalScrollIndicator={false}>
      {data && data.current && (
        <View style={styles.smallContainer}>
          <CurrentWeather
            weatherCondition={data.current.condition.text}
            flag={"Positive"}
            temp={data.current.feelslike_c}
            description={"Great Weather for the crops"}
            iconSrc={`https:${data.current.condition.icon}`}
            time={getCurrentTime()}
          />
        </View>
      )}

      {futureWeatherConditions.map((futureCondition, index) => (
        <View style={styles.smallContainer} key={index}>
          <FutureWeather
            weatherCondition={futureCondition.condition.text}
            flag={"Positive"}
            time={getFutureTime(index + 1)}
            description={futureCondition.description}
            iconSrc={`https:${data.current.condition.icon}`}
            temp={futureCondition.temp_c}
          />
        </View>
      ))}
    </ScrollView>
  );
}
