import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, SafeAreaView } from 'react-native'
import React from 'react'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SelectProfile = (navigation) => {
    navigation = useNavigation()
    const showAlert = () =>
        Alert.alert(
            'This screen is not ready till now',
            'Will be ready soon!',
            [
                {
                    text: 'OK',
                    onPress: () => console.log("Alert Triggered"),
                    style: 'cancel',
                },
            ],
        );


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    backgroundColor: "black",
                    flex: 1,
                }}
            >
                <View style={styles.Header}>
                    <Text style={{
                        color: "white",
                        marginLeft: responsiveWidth(28),
                        fontSize: responsiveFontSize(2.4),
                        fontWeight: "500"
                    }}>
                        Who's Watching?
                    </Text>
                    <TouchableOpacity
                        onPress={showAlert}
                    >
                        <Text
                            style={{
                                color: "white",
                                marginLeft: responsiveWidth(18),
                                fontSize: responsiveFontSize(1.8),
                                marginTop: responsiveHeight(0.7),
                                fontWeight: "500"
                            }}>
                            Edit
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        marginTop: responsiveHeight(20)
                    }}
                >
                    <View
                        style={styles.imgView}
                    >
                        <View>

                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('New', { name: "Axel" })
                                }
                            >
                                <Image
                                    style={styles.img1}
                                    source={require("../../assets/image/profile/Profile1.jpg")}
                                />
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        marginTop: 10,
                                        fontSize: responsiveFontSize(1.8),
                                        marginRight: 10,
                                        fontWeight: "400",
                                    }}
                                >
                                    Axel
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('New', { name: "Family" })
                                }
                            >
                                <Image
                                    style={styles.img2}
                                    source={require("../../assets/image/profile/Profile2.jpg")}
                                />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                    marginTop: 10,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: "400",
                                    marginLeft: 19,
                                }}
                            >
                                Family
                            </Text>
                        </View>
                    </View>
                    <View
                        style={styles.imgView}
                    >
                        <View>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('New', { name: "Alexa" })
                                }
                            >
                                <Image
                                    style={styles.img1}
                                    source={require("../../assets/image/profile/Profile3.jpg")}
                                />
                                <Text
                                    style={{
                                        color: "white",
                                        textAlign: "center",
                                        marginTop: 5,
                                        fontSize: responsiveFontSize(1.8),
                                        fontWeight: "400",
                                        marginRight: 10,
                                    }}
                                >
                                    Alexa
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={showAlert}
                                style={{
                                    justifyContent: "center",
                                    borderColor: 'white',
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: responsiveHeight(3.3),
                                    marginLeft: responsiveWidth(3.5)
                                }}
                            >
                                <Ionicons name="add" color="white" size={40} />
                            </TouchableOpacity>
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                    marginTop: 5,
                                    fontSize: responsiveFontSize(1.8),
                                    fontWeight: "400",
                                    marginLeft: 19,
                                }}
                            >
                                Add Profile
                            </Text>
                        </View>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Header: {
        marginTop: responsiveHeight(10),
        flexDirection: 'row',
    },
    imgView: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: responsiveHeight(4),
    },
    img1: {
        height: 100,
        width: 100,
        marginRight: responsiveWidth(3),
    },
    img2: {
        height: 100,
        width: 100,
        marginLeft: responsiveWidth(3),
    }
});


export default SelectProfile