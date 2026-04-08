import { useNavigation } from '@react-navigation/native';
import { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    PixelRatio,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// ─── Responsive Scaling ────────────────────────────────────────────────────────
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const scaleW = (size) => (SCREEN_W / BASE_WIDTH) * size;
const scaleH = (size) => (SCREEN_H / BASE_HEIGHT) * size;
const scaleFont = (size) => {
  const scaled = scaleW(size);
  return Math.round(PixelRatio.roundToNearestPixel(Math.min(scaled, size * 1.4)));
};

// ─── Slide Data ────────────────────────────────────────────────────────────────
const slides = [
  {
    id: '1',
    title: 'Unlimited movies, TV shows, and more.',
    subtitle: 'Watch anywhere. Cancel anytime.\nTap the link below to sign up.',
  },
  {
    id: '2',
    title: 'Download your shows to watch offline.',
    subtitle: 'Save your favourites easily and always\nhave something to watch.',
  },
  {
    id: '3',
    title: 'Watch everywhere.',
    subtitle: 'Stream unlimited movies and TV shows\non your phone, tablet, laptop, and TV.',
  },
  {
    id: '4',
    title: 'Create profiles for kids.',
    subtitle: 'Send kids on adventures with their\nfavourite characters in a space\nmade just for them.',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────
export default function Intro() {
  const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
    </View>
  );

  return (
    <>
      {/* Force status bar transparent so it doesn't interfere */}
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Root fills entire screen including behind status bar */}
      <View style={styles.root}>
        <SafeAreaView style={styles.safeArea}>

          {/* ── Header ── */}
          <View style={styles.header}>
            <Text style={styles.logo}>NETFLIX</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity
              onPress={()=>navigation.navigate("Privacy")}
                hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
              >
                <Text style={styles.headerLink}>Privacy</Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={()=>navigation.navigate("SignIn")}
                hitSlop={{ top: 12, bottom: 12, left: 8, right: 8 }}
              >
                <Text style={styles.headerLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ── Slides ── */}
          <FlatList
            ref={flatListRef}
            data={slides}
            renderItem={renderSlide}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            style={styles.flatList}
            bounces={false}
            decelerationRate="fast"
          />

          {/* ── Bottom Section ── */}
          <View style={styles.bottomSection}>
            {/* Dots */}
            <View style={styles.dotsContainer}>
              {slides.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    index === currentIndex
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.82}
              onPress={()=>navigation.navigate("SignUp")}
              
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </View>
    </>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const ANDROID_STATUS_BAR = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
    // Push content below status bar on Android manually
    paddingTop: ANDROID_STATUS_BAR,
  },

  // ── Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleW(20),
    paddingTop: scaleH(10),
    paddingBottom: scaleH(10),
    // Ensure header never overlaps status bar
    marginTop: Platform.OS === 'android' ? 0 : scaleH(4),
  },
  logo: {
    color: '#E50914',
    fontSize: scaleFont(26),
    fontWeight: '900',
    letterSpacing: scaleW(1),
  },
  headerRight: {
    flexDirection: 'row',
    gap: scaleW(16),
  },
  headerLink: {
    color: '#fff',
    fontSize: scaleFont(14),
    fontWeight: '500',
  },

  // ── Slides
  flatList: {
    flex: 1,
  },
  slide: {
    width: SCREEN_W,
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: scaleW(24),
    paddingBottom: scaleH(24),
  },
  title: {
    color: '#fff',
    fontSize: scaleFont(30),
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: scaleFont(40),
    marginBottom: scaleH(16),
    letterSpacing: -0.3,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: scaleFont(15),
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: scaleFont(23),
  },

  // ── Bottom
  bottomSection: {
    paddingHorizontal: scaleW(20),
    // Extra bottom padding so button is never hidden by nav bar or gestures
    paddingBottom: Platform.select({
      android: scaleH(80),
      ios: scaleH(10),
    }),
    paddingTop: scaleH(18),
    alignItems: 'center',
    gap: scaleH(20),
  },

  // ── Dots
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scaleW(8),
  },
  dot: {
    borderRadius: 50,
  },
  activeDot: {
    width: scaleW(9),
    height: scaleW(9),
    backgroundColor: '#E50914',
  },
  inactiveDot: {
    width: scaleW(8),
    height: scaleW(8),
    backgroundColor: '#555',
  },

  // ── Button
  button: {
    backgroundColor: '#E50914',
    width: '100%',
    paddingVertical: scaleH(16),
    borderRadius: scaleW(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});