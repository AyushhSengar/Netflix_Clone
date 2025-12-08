import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
const New = ({ route }) => {
    // const { name } = route.params;
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text
                style={{
                    textAlign: "center",
                    fontSize: responsiveFontSize(2),
                    fontWeight: "bold"
                }}
            >
                {/* {(name)} */}
            </Text>
            <TouchableOpacity
                style={{
                    marginTop: 10
                }}
                onPress={() =>
                    navigation.goBack()
                }>
                <Text>
                    Back To Home
                </Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // marginTop: 400
        justifyContent: 'center',
    },
});

export default New;