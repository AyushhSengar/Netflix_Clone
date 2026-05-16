import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth
} from 'react-native-responsive-dimensions';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../config/firebaseConfig";

const Home = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [popularData, setPopularData] = useState([]);
  const [retroData, setRetroData] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
        if (user) {
            const userRef = doc(db, "USERS", user.uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
            setUsername(userSnap.data().UserName);
            }
        }

        const movieSnap = await getDocs(collection(db, "Movies"));
        const seriesSnap = await getDocs(collection(db, "Web_Series"));

        const movies = movieSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const series = seriesSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        const allData = [...movies, ...series];

        const clean = (str) =>
            str?.toLowerCase().replace(/[^a-z0-9]/g, '');

        const popularKeywords = [
            "wednesday",
            "squidgame",
            "doctorstrange",
            "aliceinborderland",
            "strangerthings",
            "rises"
        ];

        const retroKeywords = [
            "formula1",
            "theoffice",
            "loveisblind",
            "thegrayman",
            "heartofstone",
            "daredevil"
        ];

        const popularFiltered = allData.filter(item =>
            popularKeywords.some(k =>
            clean(item.Title).includes(k)
            )
        );

        const retroFiltered = allData.filter(item =>
            retroKeywords.some(k =>
            clean(item.Title).includes(k)
            )
        );

        setPopularData(popularFiltered.slice(0, 5));
        setRetroData(retroFiltered.slice(0, 5));

        } catch (err) {
        console.log("FETCH ERROR:", err);
        }
    });

    return unsubscribe;
    }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#1a1a2e', '#31263d', 'black']} style={{ flex: 1 }}>
        <View style={styles.container}>

          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: responsiveWidth(4),
            paddingBottom: responsiveHeight(2)
          }}>
            <View>
              <Text style={{
                fontSize: responsiveFontSize(3),
                fontWeight: "500",
                color: "#FAF9F6"
              }}>
                For {username || "Axel"}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity>
                <MaterialCommunityIcons name="cast-connected" color="#FAF9F6" size={responsiveFontSize(3)} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.getParent().navigate('Search')}>
                <Ionicons
                  style={{ marginLeft: responsiveWidth(4), marginRight: responsiveWidth(2) }}
                  name="search"
                  color="#FAF9F6"
                  size={responsiveFontSize(3)}
                />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView contentContainerStyle={{}}>

            <View style={{
              marginBottom: responsiveHeight(2),
              flexDirection: "row",
              paddingHorizontal: responsiveWidth(4),
            }}>
              <TouchableOpacity style={{ borderWidth: 1, borderColor: "grey", borderRadius: 20 }}>
                <Text style={{ color: "white", padding: 8 }}>Series</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                borderWidth: 1,
                borderColor: "grey",
                marginHorizontal: responsiveWidth(1),
                borderRadius: 20,
              }}>
                <Text style={{ color: "white", padding: 8 }}>Films</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{
                borderWidth: 1,
                borderColor: "grey",
                marginHorizontal: responsiveWidth(1),
                borderRadius: 20,
                flexDirection: "row",
              }}>
                <Text style={{ color: "white", padding: 8 }}>Categories</Text>
              </TouchableOpacity>
            </View>

            <View>
              <ImageBackground
                style={{
                  alignContent: "center",
                  marginHorizontal: responsiveWidth(4),
                  overflow: 'hidden',
                  borderRadius: 21,
                  borderColor: "#818181",
                  justifyContent: "center"
                }}
                source={{ uri: "https://www.hollywoodreporter.com/wp-content/uploads/2024/12/You-season-5-poster-1-H-2024.png?w=1000" }}
              >
                <View style={styles.buttonContainer}>
                </View>
              </ImageBackground>
            </View>

            <Text style={styles.sectionTitle}>Popular on Netflix</Text>

            <ScrollView horizontal>
              <View style={styles.row}>
                {popularData.map(item => (
                  <TouchableOpacity key={item.id} onPress={() => navigation.navigate("Movie", { item })}>
                    <Image source={{ uri: item.IMG }} style={styles.img} />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <Text style={styles.sectionTitle}>Retro TV</Text>

            <ScrollView horizontal>
              <View style={styles.row}>
                {retroData.map(item => (
                  <TouchableOpacity key={item.id} onPress={() => navigation.navigate("Movie", { item })}>
                    <Image source={{ uri: item.IMG }} style={styles.img} />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <StatusBar style="inverted" />
          </ScrollView>

        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: responsiveHeight(7),
  },

  sectionTitle: {
    color: "#fff",
    marginHorizontal: responsiveWidth(4),
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2.3),
  },

  row: {
    flexDirection: "row",
    marginHorizontal: responsiveWidth(4),
    marginVertical: responsiveHeight(1),
    gap: 5,
  },

  img: {
    height: 180,
    width: 120,
    borderRadius: 4,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    marginTop: responsiveHeight(58),
  },

  playButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
    marginRight: 10
  },

  listButton: {
    flexDirection: 'row',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 4,
  },

  playText: {
    marginLeft: 6,
    color: '#000',
  },

  listText: {
    marginLeft: 6,
    color: '#fff'
  }
});

export default Home;