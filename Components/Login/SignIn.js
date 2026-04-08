import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView,
    PixelRatio,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { signInWithEmailAndPassword } from "firebase/auth";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth } from "../../config/firebaseConfig";

// ─── Responsive Scaling ─────────────────────────────────────────
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const scaleW = (s) => (SCREEN_W / BASE_WIDTH) * s;
const scaleH = (s) => (SCREEN_H / BASE_HEIGHT) * s;
const scaleFont = (s) =>
  Math.round(PixelRatio.roundToNearestPixel(Math.min((SCREEN_W / BASE_WIDTH) * s, s * 1.4)));

const ANDROID_SB = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

// ─── Floating Input ─────────────────────────────────────────────
const FloatingInput = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  showPassword,
  onToggle,
}) => {
  const [focused, setFocused] = useState(false);
  const isLifted = focused || value.length > 0;

  return (
    <View style={inputStyles.wrapper}>

      <TextInput
        style={[
          inputStyles.input,
          focused && inputStyles.inputFocused,
          secureTextEntry && { paddingRight: 50 }
        ]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        secureTextEntry={secureTextEntry && !showPassword}
        autoCapitalize="none"
        placeholder=" "
      />

      <Text style={[inputStyles.label, isLifted && inputStyles.labelLifted]}>
        {label}
      </Text>

      {secureTextEntry && (
        <TouchableOpacity
          onPress={onToggle}
          style={inputStyles.eyeContainer}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={22}
            color="#aaa"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const inputStyles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginBottom: scaleH(14),
  },
  input: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: scaleW(4),
    color: '#fff',
    fontSize: scaleFont(16),
    paddingTop: scaleH(22),
    paddingBottom: scaleH(8),
    paddingHorizontal: scaleW(16),
    height: scaleH(58),
  },
  inputFocused: {
    borderColor: '#8c8c8c',
  },
  label: {
    position: 'absolute',
    left: scaleW(16),
    top: scaleH(19),
    color: '#8c8c8c',
    fontSize: scaleFont(16),
  },
  labelLifted: {
    top: scaleH(8),
    fontSize: scaleFont(11),
  },
  eyeContainer: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -11 }],
    zIndex: 10,
    elevation: 10,
    padding: 5,
  },
});

// ─── MAIN SCREEN ────────────────────────────────────────────────
export default function NetflixSignIn() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Logged in:", userCredential.user);

    } catch (error) {
      console.log(error.code);

      if (error.code === "auth/user-not-found") {
        alert("User not found");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password");
      } else {
        alert("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <ScrollView contentContainerStyle={styles.scroll}>

          <Text style={styles.logo}>NETFLIX</Text>

          <View style={styles.card}>
            <Text style={styles.title}>Sign In</Text>

            <FloatingInput
              label="Email"
              value={email}
              onChangeText={setEmail}
            />

            <FloatingInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              showPassword={showPw}
              onToggle={() => setShowPw(!showPw)}
            />

            <TouchableOpacity style={styles.btn} onPress={handleSignIn}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.btnText}>Sign In</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.link}>New user? Sign Up</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

// ─── STYLES ─────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    color: '#E50914',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 6,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  btn: {
    backgroundColor: '#E50914',
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#fff',
    marginTop: 15,
    textAlign: "center",
  },
});