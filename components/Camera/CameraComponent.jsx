import { Text, SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useEffect, useRef } from 'react';
import { useFocusEffect } from "@react-navigation/native";
import { View, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from "../Buttons/CameraButton";
import { NativeModules, useWindowDimensions} from "react-native";

export default function CameraComponent(){
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;
    const {StatusBarManager} = NativeModules;
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#000',
          padding: 4,
          marginTop : StatusBarManager.HEIGHT,
        },
        controls: {
          flex: 0.5,
        },
        button: {
          height: 40,
          borderRadius: 6,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        text: {
          fontWeight: 'bold',
          fontSize: 16,
          color: '#E9730F',
          marginLeft: 10,
        },
        camera: {
          flex: 5,
          borderRadius: 20,
          width : windowWidth,
          height: windowHeight
        },
        topControls: {
          flex: 1,
        },
      });

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    const [permissionsRequested, setPermissionsRequested] = useState(false);

    useEffect(() => {
        (async () => {
          MediaLibrary.requestPermissionsAsync();
          const cameraStatus = await Camera.requestCameraPermissionsAsync();
          setHasCameraPermission(cameraStatus.status === 'granted');
        })();
      }, []);

    useFocusEffect(
        React.useCallback(() => {
          const requestPermissions = async () => {
            await MediaLibrary.requestPermissionsAsync();
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');
          };
    
          requestPermissions();
        }, [])
      );

      const takePicture = async () => {
        if (cameraRef) {
          try {
            const data = await cameraRef.current.takePictureAsync();
            console.log(data);
            setImage(data.uri);
          } catch (error) {
            console.log(error);
          }
        }
      };

      const savePicture = async () => {
        if (image) {
          try {
            const asset = await MediaLibrary.createAssetAsync(image);
            alert('Picture saved! 🎉');
            setImage(null);
            console.log('saved successfully');
          } catch (error) {
            console.log(error);
          }
        }
      };
    
      if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }
    
      return (
        <View style={styles.container}>
          {!image ? (
            <Camera
              style={styles.camera}
              type={type}
              ref={cameraRef}
              flashMode={flash}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 30,
                }}
              >
                <CameraButton
                  
                  icon="camera-reverse"
                  onPress={() => {
                    setType(
                      type === CameraType.back ? CameraType.front : CameraType.back
                    );
                  }}
                />
                <CameraButton
                  onPress={() =>
                    setFlash(
                      flash === Camera.Constants.FlashMode.off
                        ? Camera.Constants.FlashMode.torch
                        : Camera.Constants.FlashMode.off
                    )
                  }
                  
                  icon="flash"
                  color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#fff'}
                />
              </View>
            </Camera>
          ) : (
            <Image source={{ uri: image }} style={styles.camera} />
          )}
    
          <View style={styles.controls}>
            {image ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 50,
                }}
              >
                <CameraButton
                  title="Re-take"
                  onPress={() => setImage(null)}
                  icon="camera-reverse"
                />
                <CameraButton title="Save" onPress={savePicture} icon="save" />
              </View>
            ) : (
              <CameraButton title="Take a picture" onPress={takePicture} icon="camera" />
            )}
          </View>
        </View>
      );
    }
