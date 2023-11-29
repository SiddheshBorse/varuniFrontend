import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, useWindowDimensions, Image } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { COLORS } from "../../constants/theme";
// ... (imports)

export default function DiseaseResultCard({ information }) {
    const windowHeight = useWindowDimensions().height;
    const windowWidth = useWindowDimensions().width;
  
    const [collapsed, setCollapsed] = useState(true);
  
    const toggleExpand = () => {
      setCollapsed(!collapsed);
    };
  
    const animatedStyle = useAnimatedStyle(() => {
      const animatedHeight = collapsed ? withTiming(0) : withTiming(windowHeight * 0.53);
      return {
        height: animatedHeight,
        overflow: 'hidden',
      };
    });
  
    const styles = StyleSheet.create({
      sections: {
        flexDirection: 'row',
        gap: 4,
        width: windowWidth * 0.8,
        marginVertical: 8,
      },
      title: {
        fontWeight: '700',
        fontSize: 16,
      },
      container: {
        borderWidth: 0,
        borderRadius: 15,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: COLORS.gray,
        padding: 16,
        marginBottom: 8,
      },
      information: {
        justifyContent: 'flex-start',
        width: windowWidth * 0.8
      },
      img: {
        height: windowHeight * 0.25,
        width: windowWidth * 0.8,
        borderRadius: 15
      },
    });

    const imagePaths = {
        "Anthracnose": require('../../assets/DiseaseImages/anthracnose.jpeg'),
        "Black Measles": require('../../assets/DiseaseImages/black_measles.jpeg'),
        "Black Rot": require('../../assets/DiseaseImages/black_rot.jpeg'),
        "Downy Mildew": require('../../assets/DiseaseImages/downy_mildew.jpeg'),
        "Healthy": require('../../assets/DiseaseImages/healthy.jpeg'),
        "Leaf Spot": require('../../assets/DiseaseImages/leaf_spot.jpeg'),
        "Powdery Mildew": require('../../assets/DiseaseImages/powdery_mildew.jpeg'),
      };

    const imagePath = information.name;
    console.log(imagePath);
    const imageSource = imagePaths[imagePath];
    console.log(imageSource);

    return (
      <TouchableOpacity style={styles.container} onPress={toggleExpand} activeOpacity={0.9}>
        <View style={styles.sections}>
          <Text style={styles.title}>About the disease</Text>
        </View>
        <View style={styles.sections}>
          <Text style={{ fontStyle: 'italic' }}>
            We believe your crop has been contracted with the {information.name}. Click to expand and read more on the disease
          </Text>
        </View>
        <Animated.View style={[animatedStyle]}>
          <View style={[{ alignItems: 'flex-start' }, { gap: 16 }]}>
            <Text style={styles.name}> <Text style = {{fontWeight: "700"}}>Disease Name : </Text> {information.name}</Text>
            <Text style={styles.information}> <Text style = {{fontWeight: "700"}}>Causal Agent : </Text> {information.causalAgent}</Text>
            <Text style={styles.information}> <Text style = {{fontWeight: "700"}}>Symptoms : </Text> {information.symptoms}</Text>
            <Text style={styles.information}> <Text style = {{fontWeight: "700"}}>Impact : </Text> {information.impact}</Text>
            <Text style={styles.information}> <Text style = {{fontWeight: "700"}}>Impact : </Text> {information.management}</Text>
            {imageSource && <Image style={styles.img} source={imageSource} onError={(error) => console.error('Image loading error:', error)}/>}
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
  