
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Home from '../Screens/Home';
import New from '../Screens/New';
import SignUp from '../Login/SignUp';
import SignIn from '../Login/SignIn';
import SelectProfile from '../Login/SelectProfile';
import Mobile_Games from '../Screens/Sub_Screen/Mobile_Games';
import Movie from '../Screens/Movie';
import GamesList from '../Database/GameList';
import NavBar from './NavBar';



export default function Stack() {
    const Stack = createStackNavigator()
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='New' component={New} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='SelectProfile' component={SelectProfile} />
            <Stack.Screen name='Mobile_Games' component={Mobile_Games} />
            <Stack.Screen name='Movie' component={Movie} />
            <Stack.Screen name='GamesList' component={GamesList} />
            <Stack.Screen name='Navbar' component={NavBar} />
        </Stack.Navigator>

    );
}