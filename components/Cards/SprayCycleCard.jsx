import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text , TouchableOpacity , useWindowDimensions} from "react-native";
import { COLORS } from "../../constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import SprayTypeTag from "../Tags/SprayTypeTag";
import Collapsible from "react-native-collapsible";
import Animated, {useAnimatedStyle, withTiming} from "react-native-reanimated";
import CardButton from "../Buttons/CardButton";

export default function SprayCycleCard({type, spray, count}){
    const windowHeight = useWindowDimensions().height;
    const windowWidth = useWindowDimensions().width;
    const toggleExpand= () => {
        setCollapsed(!collapsed);
    };

    const [collapsed, setCollapsed] = useState(true);

    const animatedStyle = useAnimatedStyle(() => {
        const animatedHeight = collapsed ? withTiming(0): withTiming(50);
        return {
            height : animatedHeight,
            overflow : "hidden"
        }
    })

    const styles = StyleSheet.create({
        sprayTitle : {
            fontSize : 24,
            fontWeight : "700",
        },
        sections : {
            flexDirection : "row",
            gap : 8,
            flex : 1,
            width : windowWidth * 0.8,
            margin : 8,
        },
        container : {
            borderColor : COLORS.primary,
            borderWidth : 1,
            borderRadius : 15,
            justifyContent : "center",
            alignItems : "center",
            backgroundColor : count%2 == 0 ? COLORS.secondary : COLORS.tertiary,
            padding : 16,
            marginBottom : 8,
        },
        thickText : {
            fontWeight : "600"
        }
    });
    return(
        <TouchableOpacity style = {styles.container} onPress={toggleExpand} activeOpacity={1}>
            <View style = {styles.sections}>
                <Text style = {styles.sprayTitle}>{spray.name}</Text>
                <SprayTypeTag type = {type}/>
            </View>
            <View style = {[styles.sections, {justifyContent : "space-between"}]}>
                <Text>Total Sprays</Text>
                <Text>{spray.totalSprays}</Text>
            </View>
            <View style = {[styles.sections, {justifyContent : "space-between"}]}>
                <Text>Quantity Per Litre</Text>
                <Text>{spray.quantityLitre}</Text>
            </View>
            <View style = {[styles.sections, {justifyContent : "space-between"}]}>
                <Text>Quantity Per Acre</Text>
                <Text>{spray.quantityAcre}</Text>
            </View>
            <Animated.View style = {animatedStyle}>
                <View style = {[styles.sections, {justifyContent : "space-between"}]}>
                    <CardButton type = {"check"}/>
                    <CardButton type = {"feedback"}/>
                    <CardButton type = {"report"}/>
                </View>
            </Animated.View>
        </TouchableOpacity>
    )
}