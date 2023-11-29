import { View, StyleSheet, Image, Text, TextInput } from "react-native";
import { useWindowDimensions } from "react-native";
import FillButton from "../../components/Buttons/FillButton";
import { COLORS } from "../../constants/theme";
import { useState } from "react";
import { firebaseSignin } from "../../firebase/functions/authentication";
export default function SignInScreen({navigation}) {
  const windowWidth = useWindowDimensions().width;
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit =async()=>{
    try{
        await firebaseSignin(email,password);
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
        // console.log("Successful");
        navigation.reset({
          index: 0,
          routes: [{ name: 'AppScreen' }],
        });
    }catch(error){
        setEmail('');
        setPassword('');
        setEmailError('');
        setPasswordError('');
        if (error.code === 'auth/invalid-login-credentials') {
            setEmailError('Invalid Credentials try again');
          } else if (error.code === 'auth/wrong-password') {
            setPasswordError('Wrong password. Please try again.');
          } else {
            // Handle other authentication errors here
            setEmailError('Invalid Credentials try again');
            setPasswordError('Wrong password. Please try again.');
          }
    }
    
  }

  const styles = StyleSheet.create({
    cover: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
        fontSize: 25,
        color: COLORS.primary,
        fontWeight:"800",
        textAlign:"center"
    },
    loginContainer:{
        backgroundColor: "#FFFFF",
        flexDirection:"column",
        justifyContent:"center",
        width:windowWidth*0.8
    },
    image:{
        width:windowWidth/2, 
        height:windowWidth/2,
        marginLeft:windowWidth*0.10
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
      button:{
        marginTop:10
      },
      inputError: {
        borderColor: 'red',
      },
      errorText: {
        color: 'red',
      },
  });
  return (
    <View style={styles.cover}>
      <View style={styles.loginContainer}>
        <Image style={styles.image} source={require("../../assets/icon.png")} />
        <Text style={styles.title}>Log In</Text>
        <View style={[styles.inputCover, emailError && styles.inputError]}>
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            style={[styles.input, emailError && styles.inputError]}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>
        <View style={[styles.inputCover, passwordError && styles.inputError]}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput
            style={[styles.input, passwordError && styles.inputError]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>
        <View>
            <Text>Forgot passsword? Click Here</Text>
        </View>
        <FillButton title={"Log In"} style={styles.button} onPress={handleSubmit}/>
      </View>
    </View>
  );
}
