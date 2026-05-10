import { createStackNavigator } from '@react-navigation/stack';

import Downloads from '../Screens/Downloads';
import Movie from '../Screens/Movie';

const Stack = createStackNavigator();

export default function DownloadStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="DownloadsScreen"
        component={Downloads}
      />

      <Stack.Screen
        name="Movie"
        component={Movie}
      />

    </Stack.Navigator>
  );
}