import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'

const Mobile_Games = () => {
    return (
        <View
            style={{
                backgroundColor: "black",
                flex: 1,

            }}
        >
            <Text
                style={{
                    color: "white",
                    textAlign: "center",
                    marginTop: responsiveHeight(7),
                    marginBottom: responsiveHeight(4),
                    fontSize: responsiveFontSize(2.4),
                    fontWeight: "500",
                }}
            >
                My List
            </Text>
            <View
                style={{
                    marginLeft: responsiveWidth(4),
                    marginTop: responsiveHeight(1),
                    flexDirection: "row",
                    gap: 20,
                    justifyContent: "center"
                }}
            >
                <TouchableOpacity>
                    <Image source={{ uri: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/b0/cb/ab/b0cbab81-5658-8167-266a-32d44bd22f6b/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/434x0w.webp" }}
                        style={{ height: 110, width: 110, borderRadius: 20 }}
                    />
                    <Text
                        style={{ color: "white", textAlign: "center" }}
                    >
                        GTA sa
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={{ uri: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/df/b1/7f/dfb17fbb-2cef-d26f-fb92-0cbe60351714/AppIcon-1x_U007emarketing-0-7-0-85-220-0.jpeg/434x0w.webp" }}
                        style={{ height: 110, width: 110, borderRadius: 20 }}
                    />
                    <Text
                        style={{ color: "white", textAlign: "center" }}
                    >
                        Civilization VI
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={{ uri: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/34/c3/0f/34c30ffb-720e-5595-a7da-ebc9ae95dd20/AppIcon-0-0-1x_U007emarketing-0-8-0-85-220.png/434x0w.webp" }}
                        style={{ height: 110, width: 110, borderRadius: 20 }}
                    />
                    <Text
                        style={{ color: "white", textAlign: "center" }}
                    >
                        Snake.io
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={{
                    marginLeft: responsiveWidth(4),
                    marginTop: responsiveHeight(1),
                    flexDirection: "row",
                    gap: 20,
                    justifyContent: "center"
                }}
            >

                <TouchableOpacity>
                    <Image source={{ uri: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/42/85/b9/4285b989-82b7-1c61-f3a6-a579166c138c/AppIcon-1x_U007emarketing-0-8-0-85-220-0.png/434x0w.webp" }}
                        style={{ height: 110, width: 110, borderRadius: 20 }}
                    />
                    <Text
                        style={{ color: "white", textAlign: "center" }}
                    >
                        SpongeBob
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={{ uri: "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/bc/65/c0/bc65c08a-96ad-c379-0d0b-294a477a9a54/AppIcon-1x_U007emarketing-0-7-0-85-220.png/434x0w.webp" }}
                        style={{ height: 110, width: 110, borderRadius: 20 }}
                    />
                    <Text
                        style={{ color: "white", textAlign: "center" }}
                    >
                        Storyteller
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={{ uri: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/36/88/d1/3688d17b-751f-1087-5c0e-6e95684f0291/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/434x0w.webp" }}
                        style={{ height: 110, width: 110, borderRadius: 20 }}
                    />
                    <Text
                        style={{ color: "white", textAlign: "center" }}
                    >
                        Snake.io
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Mobile_Games