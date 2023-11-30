import { Text, SafeAreaView, StyleSheet, View, useWindowDimensions, ScrollView} from "react-native";
import { NativeModules } from "react-native";
import GeneralButton from "../components/Buttons/GeneralButton";
import { COLORS } from "../constants/theme";

export default function DocumentScreen(){
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const StatusBarManager = NativeModules;
    const getLast15Dates = () => {
        const dates = [];
        for (let i = 14; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dates.push(date.toLocaleDateString());
        }
        return dates;
    }; 
    const styles = StyleSheet.create({
        container : {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop : StatusBarManager.HEIGHT,
            paddingVertical : windowHeight * 0.03,
        },
        sectionHeader : {
            fontSize : 16,
            fontWeight: "500",
            marginVertical : 4,
        },
        sectionTitleSection : {
            width : windowWidth * 0.9,
            padding : 8,
            marginHorizontal : 16,
            marginVertical : 8
        },
        section : {
            padding : windowWidth * 0.01,
            alignItems: 'flex-start',
            justifyContent: 'center',
            width : windowWidth * 0.9,
          },
          sectionTitle : {
              fontSize : 42,
              fontWeight: "700",
              marginTop: 8,
              marginBottom: 8
          },
          sectionDescription : {
            fontSize : 16,
            fontWeight : "300",
          },
          uploadSection : {
            padding : 16,
            borderRadius : 15,
            flexDirection : "row",
            alignItems : "center",
            width : windowWidth * 0.9,
            justifyContent : "space-between",
            marginBottom:20,
          }
    });
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {[styles.sectionTitleSection, {alignItems : "center"}]}>
                <Text style = {styles.sectionTitle}>History</Text>
                <Text style = {styles.sectionDescription}>Spraying History for the last 15 days</Text>
            </View>
            <ScrollView>
            <View style = {styles.section}>
                {getLast15Dates().map((date, index) => (
                        <View key={index} style = {[styles.uploadSection, {backgroundColor : COLORS.secondary}]}>
                            <Text>{date}</Text>
                            <GeneralButton text={"Upload"} icon={"cloud-upload"} color={COLORS.primary} />
                        </View>
                    ))}
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}