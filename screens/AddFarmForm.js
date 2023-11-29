import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { COLORS } from "../constants/theme";
import FillButton from "../components/Buttons/FillButton";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import HollowButton from "../components/Buttons/HollowButton";
import { auth } from "../firebase/firebase";
import axios from "axios";

export default function AddFarmForm() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [farmerID, setFarmerID] = useState(null);

  const [errorMsg, setErrorMsg] = useState(null);

  const windowWidth = useWindowDimensions().width;

  const [cutting, setCutting] = useState("");
  const [varitey, setVaritey] = useState("thompson");

  const [village, setVillage] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [villageError, setVillageError] = useState("");
  const [cityError, setCityError] = useState("");
  const [stateError, setStateError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");

  const [acerage, setAcerage] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      console.log(user.uid);
      const getFarmerURL = `http://192.168.1.3:3001/api/v1/farmers/farmers/uid/${user.uid}`;
      axios
        .get(getFarmerURL, {})
        .then((response) => {
          setFarmerID(response.data.farmer._id);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
    }
  }, []);

  const validateVillage = () => {
    if (!village.trim()) {
      setVillageError("village is required.");
    } else {
      setVillageError("");
    }
  };

  const validateCity = () => {
    if (!city.trim()) {
      setCityError("City is required.");
    } else {
      setCityError("");
    }
  };

  const validateState = () => {
    if (!state.trim()) {
      setStateError("State is required.");
    } else {
      setStateError("");
    }
  };

  const validateCountry = () => {
    if (!country.trim()) {
      setCountryError("Country is required.");
    } else {
      setCountryError("");
    }
  };

  const validatePostalCode = () => {
    if (!postalCode.trim()) {
      setPostalCodeError("Postal Code is required.");
    } else {
      setPostalCodeError("");
    }
  };

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
    } catch (error) {
      console.error("Error getting location:", error);
      setErrorMsg("Error getting location");
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    setDate(selectedDate || date);
  };

  const [date, setDate] = useState(new Date(1598051730000));

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleSubmit = async () => {
    try {
      console.log("Starting form submission...");
  
      validateVillage();
      validateCity();
      validateState();
      validateCountry();
      validatePostalCode();
  
      if (
        villageError ||
        cityError ||
        stateError ||
        countryError ||
        postalCodeError
      ) {
        console.log("Validation failed. Aborting form submission.");
        // Handle validation errors, e.g., display an error message or prevent submission
        return;
      }
  
      console.log("Validation successful. Proceeding with form submission...");
  
      const formattedDate = date.toISOString(); // Format date as string for sending to the server
  
      const farmData = {
        ownerID: farmerID,
        varitey: varitey,
        location: {
          gpsCoordinates: {
            latitude: latitude,
            longitude: longitude,
          },
          address: {
            village: village,
            city: city,
            state: state,
            country: country,
            postalCode: postalCode,
          },
        },
        acerage: acerage,
        cuttingDate: {
          date: formattedDate,
          cuttingType: cutting,
        },
      };
  
      console.log("Sending farm data to the server:", farmData);
  
      const response = await fetch(
        `http://192.168.1.3:3001/api/v1/farm/farms/${farmerID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(farmData),
        }
      );
  
      console.log("Server response:", response.status);
  
      if (response.ok) {
        const result = await response.json();
        if (result && result._id) {
          console.log("Farm created and linked to farmer successfully!", result);
          // Perform any additional actions upon successful submission
        } else {
          console.error("Unexpected response format:", result);
          // Handle unexpected response format
        }
      } else {
        const errorMessage = await response.text();
        console.error(
          "Error creating farm:",
          response.status,
          response.statusText,
          errorMessage
        );
        // Display an error message or take appropriate action
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      // Handle unexpected errors, e.g., display an error message to the user
    }
  };
  

  const styles = StyleSheet.create({
    cover: {
      flex: 1,
      justifyContent: "center",
      alignContent: "center",
      padding: 16,
    },
    Title: {
      textAlign: "center",
      fontSize: 25,
      color: COLORS.primary,
      fontWeight: "800",
    },
    inputTitle: {
      fontSize: 18,
      marginBottom: 5,
      fontWeight: "800",
    },
    input: {
      height: 60,
      borderWidth: 2,
      borderRadius: 6,
      fontSize: 18,
      padding: 10,
      borderColor: "rgba(54, 54, 54, 0.6)", // #363636 with 60% opacity
      color: "black", // Cursor color set to black
    },
    inputCover: {
      marginVertical: 12,
    },
    picker: {
      height: 40,
      width: "100%",
      borderWidth: 2,
      borderRadius: 6,
      marginTop: 5,
      borderColor: "rgba(54, 54, 54, 0.6)", // #363636 with 60% opacity
      color: "black", // Cursor color set to black
    },
    locationText: {
      fontSize: 16,
      marginBottom: 4,
      fontWeight: "600",
    },
    errorText: {
      color: "red",
      fontSize: 12,
    },
  });

  return (
    <View style={styles.cover}>
      <Text style={styles.Title}>Farm Information</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Grapes Varitey</Text>
          <Picker
            selectedValue={varitey}
            onValueChange={(itemValue, itemIndex) => setVaritey(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Thompson" value="thompson" />
          </Picker>
        </View>
        <TouchableOpacity onPress={toggleDatePicker} style={styles.inputCover}>
          <Text style={styles.inputTitle}>Cutting Date</Text>
          <TextInput
            style={styles.input}
            value={date.toLocaleDateString()} // Display selected date
            editable={false}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
          />
        )}
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Cutting Type</Text>
          <Picker
            selectedValue={cutting}
            onValueChange={(itemValue, itemIndex) => setCutting(itemValue)}
            style={styles.picker}>
            <Picker.Item label="April" value="April" />
            <Picker.Item label="September" value="September" />
          </Picker>
        </View>
        <View>
          <Text style={styles.locationText}>
            Latitude: {latitude !== null ? latitude : "Loading..."}
          </Text>
          <Text style={styles.locationText}>
            Longitude: {longitude !== null ? longitude : "Loading..."}
          </Text>
          {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
          <HollowButton title="Get Location" onPress={getLocationAsync} />
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Village</Text>
          <TextInput
            placeholder="Village"
            style={styles.input}
            value={village}
            onChangeText={setVillage}
            onBlur={validateVillage}
          />
          {villageError ? (
            <Text style={styles.errorText}>{villageError}</Text>
          ) : null}
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>City</Text>
          <TextInput
            placeholder="City"
            style={styles.input}
            value={city}
            onChangeText={setCity}
            onBlur={validateCity}
          />
          {cityError ? <Text style={styles.errorText}>{cityError}</Text> : null}
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>State</Text>
          <TextInput
            placeholder="State"
            style={styles.input}
            value={state}
            onChangeText={setState}
            onBlur={validateState}
          />
          {stateError ? (
            <Text style={styles.errorText}>{stateError}</Text>
          ) : null}
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Country</Text>
          <TextInput
            placeholder="Country"
            style={styles.input}
            value={country}
            onChangeText={setCountry}
            onBlur={validateCountry}
          />
          {countryError ? (
            <Text style={styles.errorText}>{countryError}</Text>
          ) : null}
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Postal Code</Text>
          <TextInput
            placeholder="Postal Code"
            style={styles.input}
            value={postalCode}
            onChangeText={setPostalCode}
            onBlur={validatePostalCode}
          />
          {postalCodeError ? (
            <Text style={styles.errorText}>{postalCodeError}</Text>
          ) : null}
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Acerage (in Acres)</Text>
          <TextInput
            style={styles.input}
            value={acerage}
            onChangeText={setAcerage}
          />
        </View>
        {/* <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View> */}
      </ScrollView>
      <FillButton title="Submit" onPress={handleSubmit} />
    </View>
  );
}
