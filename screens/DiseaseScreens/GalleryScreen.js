import React, { useState, useEffect } from "react";
import { Text, View, Image, useWindowDimensions } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GeneralButton from "../../components/Buttons/GeneralButton";
import { COLORS } from "../../constants/theme";

export default function GalleryScreen() {
    const windowWidth = useWindowDimensions().width;
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            margin : windowWidth * 0.2
        }
    });
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const mediaLibraryStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
            setHasMediaLibraryPermission(mediaLibraryStatus.status === "granted");
        })();
    }, []);

    const pickImage = async () => {
        if (!hasMediaLibraryPermission) {
            alert('Permission Denied');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <GeneralButton text={"Select an Image"} color={COLORS.primary} icon={"image"} onPress={() => pickImage()} />
                {image && <Image source={{ uri: image }} style={[{ flex: 1 / 2 }, {margin : 16}]} />}
            </View>
        </SafeAreaView>
    );
}