import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from './constants/theme';

function CustomTabBar({ state, descriptors, navigation }) {
    const styles = { flexDirection: 'row', backgroundColor: '#E1F8DC', marginHorizontal : 16 , marginVertical: 12, padding: 4, borderRadius : 10}
  return (
    <View style={styles}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height : 50,
              marginHorizontal : 1,
              backgroundColor: isFocused ? '#7BD350' : label == "Camera" ? COLORS.purple : '#E1F8DC',
              borderRadius: isFocused ? 10 : 10, // Adjust the border radius for the active tab
            }}
          >
            <Ionicons name = {label.toLowerCase()} style={{ color: isFocused ? 'white' : label == "Camera" ? "white" : "black" }} size = {25}/>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomTabBar;