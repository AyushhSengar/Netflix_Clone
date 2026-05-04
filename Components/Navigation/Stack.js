import { createStackNavigator } from '@react-navigation/stack';

import Intro from '../Login/Intro';
import SignIn from '../Login/SignIn';
import SignUp from '../Login/SignUp';
import Home from '../Screens/Home';
import Movie from '../Screens/Movie';
import New from '../Screens/New';
import Profile from '../Screens/Profile';
import Search from '../Screens/Search';
import Mobile_Games from '../Screens/Sub_Screen/Mobile_Games';

const StackNav = createStackNavigator();

export default function Stack() {
  return (
    <StackNav.Navigator screenOptions={{ headerShown: false }}>

      {/* <StackNav.Screen name="UploadData" component={UploadData} /> */}
      <StackNav.Screen name="Home" component={Home} />
      <StackNav.Screen name="Movie" component={Movie} />
      <StackNav.Screen name="New" component={New} />
      <StackNav.Screen name="Mobile_Games" component={Mobile_Games} />
      {/* <StackNav.Screen name="GamesList" component={GamesList} /> */}
      <StackNav.Screen name="SignIn" component={SignIn} />
      <StackNav.Screen name="SignUp" component={SignUp} />
      <StackNav.Screen name="Intro" component={Intro} />
      <StackNav.Screen name="Search" component={Search} />
      <StackNav.Screen name="Profile" component={Profile} />

    </StackNav.Navigator>
  );
}