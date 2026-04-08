import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform, StyleSheet, Text } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import Movie from '../Screens/Movie';
import Profile from '../Screens/Profile';
import Search from '../Screens/Search';
import Mobile_Games from '../Screens/Sub_Screen/Mobile_Games';
import Stack from './Stack';

const Tab = createBottomTabNavigator();
const SearchStack = createStackNavigator();

// ─── Search Stack Navigator ──────────────────────────────────────
function SearchNavigator() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: false }}>
      <SearchStack.Screen name="SearchScreen" component={Search} />
      <SearchStack.Screen
        name="Movie"
        component={Movie}
        options={{
          tabBarStyle: { display: 'none' }  // 👈 hides navbar
        }}
      />
    </SearchStack.Navigator>
  );
}


// ─── Custom Icons ────────────────────────────────────────────────

const HomeIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
      fill={color}
    />
  </Svg>
);

const FastLaughsIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
    <Path
      d="M8 13.5C8 13.5 9.5 16 12 16C14.5 16 16 13.5 16 13.5"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <Circle cx="9" cy="10" r="1" fill={color} />
    <Circle cx="15" cy="10" r="1" fill={color} />
  </Svg>
);

const NewHotIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="14" rx="2" stroke={color} strokeWidth="1.8" />
    <Path d="M10 8.5L15 11L10 13.5V8.5Z" fill={color} />
    <Path d="M8 21H16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M12 17V21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const SearchIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth="1.8" />
    <Path
      d="M16.5 16.5L21 21"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </Svg>
);

const DownloadsIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" />
    <Path
      d="M12 7V14M12 14L9 11M12 14L15 11"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ─── Tab Label ───────────────────────────────────────────────────
const TabLabel = ({ label, color }) => (
  <Text style={[styles.label, { color }]}>{label}</Text>
);

// ─── NavBar ──────────────────────────────────────────────────────
export default function NavBar() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#6b6b6b',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Stack}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          tabBarLabel: ({ color }) => <TabLabel label="Home" color={color} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <FastLaughsIcon color={color} />,
          tabBarLabel: ({ color }) => <TabLabel label="Fast Laughs" color={color} />,
        }}
      />

      <Tab.Screen
        name="NewHot"
        component={Mobile_Games}
        options={{
          tabBarIcon: ({ color }) => <NewHotIcon color={color} />,
          tabBarLabel: ({ color }) => <TabLabel label="New & Hot" color={color} />,
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchNavigator}
        options={{
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
          tabBarLabel: ({ color }) => <TabLabel label="Search" color={color} />,
        }}
      />

      <Tab.Screen
        name="Downloads"
        component={Mobile_Games}
        options={{
          tabBarIcon: ({ color }) => <DownloadsIcon color={color} />,
          tabBarLabel: ({ color }) => <TabLabel label="Downloads" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// ─── Styles ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000',
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 25 : 8,
    paddingTop: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
});