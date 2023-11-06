import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { COLORS } from "../../constants/theme";
import FillButton from "../../components/Buttons/FillButton";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { URL } from "../../constants/URL";
import { firebaseSignup } from "../../firebase/functions/authentication";
import { auth } from "../../firebase/firebase";

export default function PersonalForm({navigation}) {
  const windowWidth = useWindowDimensions().width;
  const [selectedGender, setSelectedGender] = useState("male");


  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [email, setEmail] = useState("");
  const [contact,setContact] = useState("");
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
  const [passwordError, setPasswordError] = useState("");

  const [aadharError, setAadharError] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateAadhar = () => {
    if (!/^[0-9]{12}$/.test(aadharNumber)) {
      setAadharError("Aadhar number must be exactly 12 digits.");
    } else {
      setAadharError("");
    }
  };

  const validateContact = () => {
    if (!/^[0-9]{10}$/.test(contact)) {
      setAadharError("Contact number must be exactly 10 digits.");
    } else {
      setAadharError("");
    }
  };


  const validateEmail = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

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

  const validatePassword = () => {
    if (password!=conPassword) {
      setPostalCodeError("The passsword and confirm password does not match");
    } else {
      setPostalCodeError("");
    }
  };

  const handleSubmit = async () => {
    validateAadhar();
    validateEmail();
    validateVillage();
    validateCity();
    validateState();
    validateCountry();
    validatePostalCode();
    validatePassword();
    if (!aadharError && !emailError && !cityError && !stateError && !countryError && !postalCodeError && !passwordError) {
        try{
            const user = await firebaseSignup(email,password)

            const firebaseUID = user.uid;
            const farmerData = {
                firstName: firstName,
                lastName: lastName,
                aadharNumber: aadharNumber,
                gender: selectedGender, 
                contact:contact,
                email:email,
                firebaseUID:firebaseUID,
                address:{
                    village:village,
                    city:city,
                    state:state,
                    country: country,
                    postalCode:postalCode,
                }
            };

            const apiURL = "http://192.168.1.7:3001/api/v1/farmers/farmers";

            try {
                const response = await fetch(apiURL, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(farmerData),
                });
                
                if (!response.ok) { 
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
              
                const data = await response.json();
                console.log('Farmer data submitted successfully:', data);
                navigation.replace("SignInScreen")
              } catch (error) {
                console.error('Error:', error);
              }
        }catch(error){
            console.log(error);
        }
        
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
    errorText: {
      color: "red",
      fontSize: 12,
    },
  });

  return (
    <View style={styles.cover}>
      <Text style={styles.Title}>Personal Information</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Aadhar Number</Text>
          <TextInput
            style={styles.input}
            value={aadharNumber}
            onChangeText={setAadharNumber}
            onBlur={validateAadhar}
          />
          {aadharError ? (
            <Text style={styles.errorText}>{aadharError}</Text>
          ) : null}
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Gender</Text>
          <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGender(itemValue)
            }
            style={styles.picker}>
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Others" value="others" />
          </Picker>
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            onBlur={validateEmail}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Contact Number</Text>
          <TextInput
            style={styles.input}
            value={contact}
            onChangeText={setContact}
            onBlur={validateContact}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
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
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            placeholder="Enter Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          {postalCodeError ? (
            <Text style={styles.errorText}>{postalCodeError}</Text>
          ) : null}
        </View>
        <View style={styles.inputCover}>
          <Text style={styles.inputTitle}>Confirm Password</Text>
          <TextInput
            placeholder="Reenter Password"
            style={styles.input}
            value={conPassword}
            onChangeText={setConPassword}
            onBlur={validatePassword}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>
      </ScrollView>
      <FillButton title="Submit" onPress={handleSubmit} />
    </View>
  );
}
