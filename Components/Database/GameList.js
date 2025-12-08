import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, FlatList, TouchableOpacity, SafeAreaView, View, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import List from '../Database/AppList'

const GamesList = () => {
    const navigation = useNavigation()
    return (
        <View
            style={{
                // backgroundColor:"tr"
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: responsiveWidth(4),
                    marginTop: responsiveHeight(2),
                }}
            >
                <View>
                    <Text
                        style={{
                            color: "#fff",
                            fontWeight: "500",
                            fontSize: responsiveFontSize(2.3)

                        }}
                    >
                        Mobile Games
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => { navigation.navigate("Mobile_Games") }}
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <Text
                        style={{
                            color: "#9A9A9A",
                            fontWeight: "500",
                            fontSize: responsiveFontSize(2),
                        }}
                    >
                        My List
                    </Text>
                    <AntDesign name="right" color="#9A9A9A" size={18} style={{ marginTop: responsiveHeight(0.5), marginLeft: responsiveWidth(0.7) }} />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    marginLeft: responsiveWidth(3),
                }}
            >
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={List}
                    renderItem={(element) => {

                        return <View>
                            <View
                                style={{
                                    marginHorizontal: responsiveWidth(1),
                                    marginTop: responsiveHeight(1),
                                    flexDirection: "row",
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate("Mobile_Games") }}
                                >
                                    <Image source={{ uri: (element.item.uri) }}
                                        style={{ height: 110, width: 110, borderRadius: 20 }}
                                    />
                                    <Text style={styles.txt}>
                                        {element.item.name}
                                    </Text>
                                    <Text style={styles.subtxt} >
                                        {element.item.subText}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    txt: {
        color: "#FAF9F6", fontSize: responsiveFontSize(1.7), fontWeight: "500"
    },
    subtxt: {
        color: "grey", fontSize: responsiveFontSize(1.4)
    },
    img: {
        height: 180, width: 120, borderRadius: 4,
    },
    bigimg: {
        height: 310, width: 170, borderRadius: 4,
        marginBottom: 200,
    }
})

export default GamesList
