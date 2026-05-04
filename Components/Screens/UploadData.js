import { doc, setDoc } from 'firebase/firestore';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../config/firebaseConfig';

// 🔥 your JSON file
import movies from '../Data/Movies.json';

export default function UploadData() {

  // 🔥 CLEAN TITLE → SAFE DOCUMENT ID
  const makeId = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')   // remove spaces + symbols
      .trim();
  };

  const uploadMovies = async () => {
    try {
      for (let i = 0; i < movies.length; i++) {

        const movie = movies[i];

        const docId = makeId(movie.Title);

        await setDoc(
          doc(db, "Movies", docId),
          movie
        );

        console.log("Uploaded:", movie.Title);
      }

      Alert.alert("Success", "Movies uploaded with Title IDs 🚀");

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Upload failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Movies (Title as ID)</Text>

      <TouchableOpacity style={styles.button} onPress={uploadMovies}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },

  title: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20
  },

  button: {
    backgroundColor: '#e50914',
    padding: 15,
    borderRadius: 5
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600'
  }
});