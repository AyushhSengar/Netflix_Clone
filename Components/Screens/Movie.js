import { View, Text, TouchableOpacity, Button } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useRef, useState } from 'react'
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import YOU from "../../assets/VIDEO/YOU.mp4"
// import { Video } from 'expo-av';

const Movie = () => {
    const video = React.useRef(null);
    const secondVideo = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [StatusSecondVideo, setStatusSecondVideo] = React.useState({})
    return (
        <View
            style={{
                flex: 1,
                // height: 200
            }}
        >
            <View
                style={{
                    // paddingTop: 100,
                    flex: 1,
                    // justifyContent: "flex-start"
                }}
            >
                {/* <Video
                    ref={video}
                    style={{
                        flex: 1,
                        alignSelf: "stretch"
                    }}
                    source={require("../../assets/VIDEO/YOU.mp4")}
                    // useNativeControls
                    resizeMode='contain'
                // isLooping
                // onPlaybackStatusUpdate={setStatus}
                /> */}
            </View>
            {/* <View
                style={{
                    margin: 16,
                }}
            >
                <Button title='Play from 5s' onPress={() => video.current.playFromPositionAsync(5000)} />
                <Button title={status.isLooping ? "Set to not Loop" : "Set to Loop"} onPress={() => video.current.setIsLoopingAsync(!status.isLooping)} />
            </View> */}
            <Text>
                kjbergejrg
            </Text>
        </View>
    )
}

export default Movie