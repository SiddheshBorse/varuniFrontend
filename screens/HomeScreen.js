import { View,Text,Button } from "react-native"
export default function HomeScreen({navigation}){
    return(
        <View>
            <Text>Home screen</Text>
            <Button title="Go to about" onPress={()=>navigation.navigate("About")}/>
        </View>
    )
}