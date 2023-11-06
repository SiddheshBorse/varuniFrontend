import { Text, SafeAreaView, StyleSheet, View, useWindowDimensions} from "react-native";
import { NativeModules } from "react-native";
import GeneralButton from "../components/Buttons/GeneralButton";
import { COLORS } from "../constants/theme";

export default function DocumentScreen(){
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const StatusBarManager = NativeModules;
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
            justifyContent : "space-between"
          }
    });
    return (
        <SafeAreaView style = {styles.container}>
            <View style = {[styles.sectionTitleSection, {alignItems : "center"}]}>
                <Text style = {styles.sectionTitle}>Diagnostics</Text>
                <Text style = {styles.sectionDescription}>Upload Various Documents for better analysis</Text>
            </View>
            <View style = {styles.sectionTitleSection}>
                <Text style = {[styles.sectionHeader]}>Soil Report</Text>
                <Text style = {styles.sectionDescription}>upload soil reports to analyse, get results and improve suggestions for daily sprays</Text>
            </View>
            <View style = {styles.section}>
                <View style = {[styles.uploadSection, {backgroundColor : COLORS.secondary}]}>
                    <Text>Upload Soil reports</Text>
                    <GeneralButton text = {"Upload"} icon={"cloud-upload"} color={COLORS.primary}/>
                </View>
            </View>
            <View style = {styles.sectionTitleSection}>
                <Text style = {[styles.sectionHeader]}>Petoile Report</Text>
                <Text style = {styles.sectionDescription}>upload petoile reports to analys, get results and improve suggestions</Text>
            </View>
            <View style = {styles.section}>
                <View style = {[styles.uploadSection, {backgroundColor : COLORS.purpleBackground}]}>
                    <Text>Upload Petiole reports</Text>
                    <GeneralButton text = {"Upload"} icon={"cloud-upload"} color={COLORS.purple}/>
                </View>
            </View>
            
        </SafeAreaView>
    )
}