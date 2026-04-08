import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebaseConfig';

import Intro from './Components/Login/Intro';
import Privacy from './Components/Login/Privacy';
import SelectProfile from './Components/Login/SelectProfile';
import SignIn from './Components/Login/SignIn';
import SignUp from './Components/Login/SignUp';
import NavBar from './Components/Navigation/NavBar';

const RootStack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state:", currentUser ? currentUser.email : "NO USER");
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <RootStack.Screen name="MainApp" component={NavBar} />
            <RootStack.Screen name="SelectProfile" component={SelectProfile} />
          </>
        ) : (
          <>
            <RootStack.Screen name="Intro" component={Intro} />
            <RootStack.Screen name="SignIn" component={SignIn} />
            <RootStack.Screen name="SignUp" component={SignUp} />
            <RootStack.Screen name="Privacy" component={Privacy} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}