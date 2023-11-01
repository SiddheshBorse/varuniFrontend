import { StyleSheet, Text, View, StatusBar,SafeAreaView,Image} from 'react-native'
import { COLORS } from '../../constants/theme';
import FillButton from '../../components/Buttons/FillButton';
import { useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function JoinUs(){
    const windowWidth = useWindowDimensions().width;

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        cover: {
            flex: 1,
        },
        title: {
            fontSize: 25,
            color: COLORS.primary,
        },
        paragraph: {
            fontSize: 16
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
        navigation:{
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
            <Image style={styles.image} source={require("../../assets/loginImages/loginImage2.png")}/>
            <View style={styles.textCover}>
                <Text style={styles.title}>Join Us</Text>
                <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi.
                </Text>
            </View>
            <View style={styles.navigation}>
                <FillButton style={styles.details} title="Enter Details"  />
            </View>
        </View>
    )
}


