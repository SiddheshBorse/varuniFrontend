import { StyleSheet, Text, View, StatusBar,SafeAreaView,Image} from 'react-native'
import { COLORS } from '../../constants/theme';
import HollowButton from '../../components/Buttons/HollowButton';
import FillButton from '../../components/Buttons/FillButton';
import ActiveRoundButton from '../../components/Buttons/ActiveRoundButton';
import DeadRoundButton from '../../components/Buttons/DeadRoundButton';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreens3(){
    const windowWidth = useWindowDimensions().width;

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        cover: {
            flex: 1,
        },
        title: {
            fontSize: 25,
            color: COLORS.primary,
            fontFamily:"Manrope"
        },
        paragraph: {
            fontSize: 18
        },
        image: {
            width: "100%",
            aspectRatio: 32 / 18,
            height: "30%",
            
        },
        textCover: {
            padding: "2%",
            paddingTop:"5%",
            paddingLeft:"5%"
        },
        buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            paddingLeft:10 , // Adjust as needed for spacing
            paddingRight:10 , // Adjust as needed for spacing
        },
        prev:{
            width: windowWidth/6,
        },
        next:{
            width: windowWidth/5,
        },
        navigation:{
            flexDirection: "row",
            justifyContent: "space-between",
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            paddingLeft: 10, // Adjust as needed for spacing
            paddingRight: 10, // Adjust as needed for spacing
        }
    });
    
    return(
        <View style={styles.cover}>
            <Image style={styles.image} source={require("../../assets/loginImages/loginImage1.png")}/>
            <View style={styles.textCover}>
                <Text style={styles.title}>Have a healthy Vineyard</Text>
                <Text style={styles.paragraph}>
                Revitalize Your Vineyard with Proven Strategies for Optimal Health and Growth.
                </Text>
            </View>
            <View style={styles.navigation}>
                <HollowButton style={styles.prev} title="Prev" onPress={() => navigation.navigate('SignUpScreen1')}/>
                <DeadRoundButton title="1" onPress={() => navigation.navigate('SignUpScreen1')}/>
                <DeadRoundButton title="2" onPress={() => navigation.navigate('SignUpScreen2')}/>
                <ActiveRoundButton title="3"/>
                <FillButton style={styles.next} title="Next" disabled={true}/>
            </View>
        </View>
    )
}


