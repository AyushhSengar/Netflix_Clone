import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { db } from "../../config/firebaseConfig";

import { collection, getDocs } from "firebase/firestore";

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovies = async () => {
    try {
      console.log("Fetching data...");

      const snapshot = await getDocs(collection(db, "Home_Page"));

      console.log("Docs count:", snapshot.docs.length);

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
    getMovies();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="red" />
        <Text style={{ color: "white", marginTop: 10 }}>
          Loading...
        </Text>
      </View>
    );
  }

  if (movies.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>
          No Data Found
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 10 }}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Image
              source={{ uri: item.IMG }}
              style={{ width: 160, height: 220, borderRadius: 10 }}
            />

            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              {item.Title}
            </Text>

            <Text style={{ color: "#aaa" }}>
              Seasons: {item.Seasons}
            </Text>

            <Text style={{ color: "#aaa" }}>
              IMDB: {item.IMDB}
            </Text>
          </View>
        )}
      />
    </View>
  );
}