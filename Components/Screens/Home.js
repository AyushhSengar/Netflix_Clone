import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { default as Ionicons } from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from "../../config/firebaseConfig";

// 🔥 ADDED
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth } from "../../config/firebaseConfig";
// 🔥 ADDED

import { signOut } from 'firebase/auth';

const handleLogout = async () => {
  await signOut(auth);
  // App.js will automatically redirect to Intro!
};


const DATA = [
  {
    id: '1',
    img_url:"https://m.media-amazon.com/images/I/81Y1OJVIoJL._UF1000,1000_QL80_.jpg",
    title: 'First Item',
  },
  { 
    img_url:"https://puzzlemania-154aa.kxcdn.com/products/2024/puzzle-clementoni-1000-pieces-netflix-squid-game.webp",
    title: 'Second Item',
  },
  { 
    img_url:"https://lumiere-a.akamaihd.net/v1/images/p_doctorstrange_19918_516f94d3.jpeg",
    title: 'Third Item',
  },
    { 
    img_url:"https://m.media-amazon.com/images/M/MV5BZDdhMTAwMmQtOTVlYi00OTcwLTllZGMtMjc4NGU0NzFhODM3XkEyXkFqcGc@._V1_.jpg",
    title: 'Second Item',
   
  },
    { 
    img_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkIBS32B4Br16OAdgszVHXYw39I05ehv_OCd1MTzsBqt0XzM5EHgy7KxHt6sXMRzbpxDY&usqp=CAU",
    title: 'Third Item',
  },
];

const Home = () => {
  const navigation = useNavigation(); // ✅ clean declaration

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  // 🔥 ADDED
    const [authChecked, setAuthChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [userLoaded, setUserLoaded] = useState(false);

  const getMovies = async () => {
    try {
      console.log("Fetching data...");
      const snapshot = await getDocs(collection(db, "Home_Page"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("DATA:", data);
      setMovies(data);
    } catch (err) {
      console.log("ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userRef = doc(db, "USERS", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUsername(userSnap.data().UserName);
        } else {
          console.log("No user doc");
        }

        const snapshot = await getDocs(collection(db, "Home_Page"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMovies(data);

      } catch (error) {
        console.log("ERROR:", error);
      }
    }

    setAuthChecked(true);
    setUserLoaded(true); // ✅ ADD THIS
  });

  return unsubscribe;
}, []);

    if (!authChecked || !userLoaded) {
        return <View style={{ flex: 1, backgroundColor: "black" }} />;
    }
  return ( 
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1a1a2e', '#31263d', 'black']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: responsiveWidth(4),
              paddingBottom: responsiveHeight(2)
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: responsiveFontSize(3),
                  fontWeight: "500",
                  color: "#FAF9F6"
                }}
              >
                {/* 🔥 ONLY CHANGE */}
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

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 200 }}>
            
            {/* 🔥 EVERYTHING BELOW IS UNTOUCHED */}

            <View
              style={{
                marginBottom: responsiveHeight(2),
                flexDirection: "row",
                paddingHorizontal: responsiveWidth(4),
              }}
            >
              <TouchableOpacity style={{ borderWidth: 1, borderColor: "grey", borderRadius: 20 }}>
                <Text style={{ color: "white", padding: 8 }}>Series</Text>
              </TouchableOpacity>
              <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: "grey",
                                marginHorizontal: responsiveWidth(1),
                                borderRadius: 20,
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    padding: 8,
                                    paddingHorizontal: responsiveWidth(3.5),
                                    fontSize: responsiveFontSize(1.6)
                                }}
                            >
                                Films
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout}>
  <Text style={{ color: 'red' }}>Sign Out</Text>
</TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: "grey",
                                marginHorizontal: responsiveWidth(1),
                                borderRadius: 20,
                                flexDirection: "row",
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    padding: 8,
                                    paddingLeft: responsiveWidth(3.5),
                                    fontSize: responsiveFontSize(1.6),
                                }}
                            >
                                Categories
                            </Text>
                            <AntDesign style={{ marginRight: 12, marginTop: responsiveWidth(2.6) }} name="down" color="white" size={14} />
                        </TouchableOpacity>
                    </View>
                <View>
                        <ImageBackground
                            style={{
                                // width: responsiveWidth(85),
                                alignContent: "center",
                                // aspectRatio: 0.7,
                                marginHorizontal: responsiveWidth(4),
                                overflow: 'hidden',
                                borderRadius: 21,
                                borderColor: "#818181",
                                justifyContent: "center"
                            }}
                            source={{ uri: "https://www.hollywoodreporter.com/wp-content/uploads/2024/12/You-season-5-poster-1-H-2024.png?w=1000" }}
                        // source={{ uri: "https://m.media-amazon.com/images/I/91iNuP5OJ7S.jpg" }}
                        >
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.playButton}>
                                    <Ionicons name="play" size={26} color="#000" />
                                    <Text style={styles.playText}>Play</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.listButton}>
                                    <Ionicons name="add" size={26} color="#fff" />
                                    <Text style={styles.listText}>My List</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View> 
                    <View>
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
                                        fontSize: responsiveFontSize(2.3),
                                    }}
                                >
                                    Popular on Netflix
                                </Text>
                            </View>
                        </View>  
                            <FlatList
                                data={DATA}
                                horizontal={true}
                                scrollEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingHorizontal: responsiveWidth(2),
                                    marginVertical:responsiveHeight(2),
                                    gap: 5,
                                }}
                                renderItem={({ item }) => (
                                    <TouchableOpacity>
                                        <Image
                                            source={{ uri: item.img_url }}
                                            style={styles.img}
                                        />
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item) => item.id}
                            />     
                    </View>
                    <View>
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
                                        fontSize: responsiveFontSize(2.3),
                                    }}
                                >
                                    Retro TV
                                </Text>
                            </View>
                        </View>
                        <ScrollView horizontal={true}>
                            <View
                                style={{
                                    marginHorizontal: responsiveWidth(4),
                                    marginTop: responsiveHeight(1),
                                    flexDirection: "row",
                                    gap: 5,
                                }}
                            >
                                <TouchableOpacity>
                                    <Image source={{ uri: "https://territorystudio.com/wp-content/uploads/2021/03/f1dtss3boxshot_na_05_en.jpg" }}
                                        style={styles.img}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiIOGpa1yBUgK5rzmyOe0R9WnyOvDNBs8K1rMZyrii7Om2Tl58buInfrtrg5_MKwxACxw&usqp=CAU" }}
                                        style={styles.img}
                                    />

                                </TouchableOpacity>

                                <TouchableOpacity>
                                    <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRazrLF4vHhW46Vb4Umytf7BhgPdYQjargbQ&s" }}
                                        style={styles.img}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={{ uri: "https://dnm.nflximg.net/api/v6/ALnfVbMvPhqZAIuQMLkxmdJcXYk/AAAAQXhUBG8m7Zwln8MvFzK4V44JtL2MUmmzDGVbcvONkI1CmBF7FanFxw4xHZpb0h-yqHlA0TiDgHITyAPT9_WdDLSvKtHXntkJIdcNmVeCJzx1TrNF8oD4qUR_GQzWVUg1DzBu1TTgWE0r8X5r1EwS8wyXZ0bpHZVOl-4aVX4tc4ifLRAw5upNFNA7geqJKCquGh8_A14NPCY54jAr6S4125bBq8X_3XLEMjlpwuVXncNTt-Z289qmUPlEJSShw7VBJfxg93l5qk372va-XQ.jpg?r=b1c" }}
                                        style={styles.img}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD99fVnatJB9-xbqiXI6mOGIiWFgqqp0Ln3ANanDPLsjY5KtDicjM1Oa2Ti1Mw7ZRXBrQ&usqp=CAU" }}
                                        style={styles.img}
                                    />
                                </TouchableOpacity>

                            </View>
                        </ScrollView>
                    </View>
                    <View>

                        <View>
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
                                            fontSize: responsiveFontSize(2.3),
                                        }}
                                    >
                                        Only on Netflix
                                    </Text>
                                </View>
                            </View>
                            <ScrollView horizontal={true}>
                                <View
                                    style={{
                                        marginHorizontal: responsiveWidth(4),
                                        marginTop: responsiveHeight(1),
                                        flexDirection: "row",
                                        gap: 5,
                                    }}
                                >
                                    <TouchableOpacity>
                                        <Image source={{ uri: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTlZudogDC96zcQ8h1btvghFoM6Y7qQd94UNUyceBqXslnarv260_Ij7QEvSp_FNmldAci5" }}
                                            style={styles.bigimg}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={{ uri: "https://i.imgur.com/fqODI9A.jpg" }}
                                            style={styles.bigimg}
                                        />

                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Image source={{ uri: "https://www.indiewire.com/wp-content/uploads/2017/09/imperial-dreams-2014.jpg?w=426" }}
                                            style={styles.bigimg}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={{ uri: "https://c8.alamy.com/comp/2PKYK1D/a-tourists-guide-to-love-poster-rachael-leigh-cook-scott-ly-2PKYK1D.jpg" }}
                                            style={styles.bigimg}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={{ uri: "https://i.pinimg.com/736x/06/75/c4/0675c460a19a1b3f176fdc5527afc77c.jpg" }}
                                            style={styles.bigimg}
                                        />
                                    </TouchableOpacity>

                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <StatusBar style="inverted" />
                </ScrollView>
            {/* <StatusBar style="inverted" /> */}
          {/* </ScrollView> */}

        </View>
      </LinearGradient> 
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: responsiveHeight(7),
        // height: responsiveHeight(1000)
    },


    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: responsiveHeight(1.5),
        paddingBottom:20,
        justifyContent: "center",
        marginTop: responsiveHeight(58),
    },

    playButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(11),
        borderRadius: 4,
        alignItems: 'center',
        marginLeft: 20,
    },
    playText: {
        marginLeft: 6,
        fontWeight: 'bold',
        color: '#000',
        fontSize: responsiveFontSize(1.8),
    },
    listButton: {
        flexDirection: 'row',
        backgroundColor: '#333',
        paddingVertical: responsiveHeight(1),
        paddingHorizontal: responsiveWidth(10),
        borderRadius: 4,
        alignItems: 'center',
        marginRight: 20,
    },
    listText: {
        marginLeft: responsiveWidth(1.8),
        fontWeight: 'bold',
        color: '#fff',
        fontSize: responsiveFontSize(1.8),
    },
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
    }
});

export default Home;
