// import { View, Text } from 'react-native'
// import React from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Stack from './Stack';
// import Mobile_Games from '../Screens/Sub_Screen/Mobile_Games';
// import Home from '../Screens/Home';
// import { NavigationContainer } from '@react-navigation/native';
// import GamesList from '../Database/GameList';
// import { BottomTabBar } from '@react-navigation/bottom-tabs';
// import { LinearGradient } from 'expo-linear-gradient';


// const Tab = createBottomTabNavigator();


// const NavBar = () => {

//     // Custom Gradient Tab Bar
//     const GradientTabBar = (props) => (
//         <LinearGradient
//             colors={['#3B302E', '#2B2221']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 0, y: 1 }}
//             style={{
//                 position: 'absolute',
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//             }}
//         >
//             <BottomTabBar {...props} />
//         </LinearGradient>
//     );

//     return (
//         <Tab.Navigator
//             initialRouteName='Home'
//             tabBar={(props) => <GradientTabBar {...props} />}
//             screenOptions={{
//                 headerShown: false,
//                 tabBarActiveTintColor: 'white',
//                 tabBarInactiveTintColor: 'grey',
//                 tabBarStyle: {
//                     backgroundColor: 'transparent',
//                     // height: 70,
//                     // paddingVertical: 10,
//                     // borderTopLeftRadius: 15,
//                     // borderTopRightRadius: 15,
//                 },
//             }}
//         >
//             <Tab.Screen name="Home" component={Stack} />
//             <Tab.Screen name="Profile" component={Mobile_Games} />
//             <Tab.Screen name="GamesList" component={GamesList} />
//         </Tab.Navigator>
//     );
// }

// export default NavBar



import React from 'react';
import { Image, Text } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Stack from './Stack';
import GamesList from '../Database/GameList';
import Mobile_Games from '../Screens/Sub_Screen/Mobile_Games';


const Tab = createBottomTabNavigator();

const GradientTabBar = (props) => (
    <LinearGradient
        colors={['#3B302E', '#2B2221']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
        }}
    >
        <BottomTabBar {...props} />
    </LinearGradient>
);

export default function App() {
    return (
        <Tab.Navigator
            tabBar={(props) => <GradientTabBar {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: {
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    elevation: 0,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return <Ionicons name="home" size={24} color={color} />;
                    } else if (route.name === 'New & Hot') {
                        return <Ionicons name="play-circle-outline" size={24} color={color} />;
                    } else if (route.name === 'My Netflix') {
                        return (
                            <Image
                                source={{ uri: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg' }} // example profile image
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: 6,
                                    borderWidth: focused ? 2 : 0,
                                    borderColor: 'white',
                                }}
                            />
                        );
                    }
                },
                tabBarLabel: ({ focused, color }) => {
                    let label = route.name;
                    return <Text style={{ color, fontSize: 12 }}>{label}</Text>;
                },
            })}
        >
            <Tab.Screen name="Home" component={Stack} />
            <Tab.Screen name="New & Hot" component={GamesList} />
            <Tab.Screen name="My Netflix" component={Mobile_Games} />
        </Tab.Navigator>

    );
}
