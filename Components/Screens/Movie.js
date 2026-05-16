import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    Dimensions,
    Image,
    Platform,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import Svg, { Circle, Path } from 'react-native-svg';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const ANDROID_SB =
  Platform.OS === 'android'
    ? StatusBar.currentHeight ?? 24
    : 0;

const BackIcon = () => (
  <Svg width={26} height={26} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 19L8 12L15 5"
      stroke="#fff"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PlayIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path d="M5 3L19 12L5 21V3Z" fill="#000" />
  </Svg>
);

const DownloadIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3V15M12 15L8 11M12 15L16 11"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3 19H21"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const PlusIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5V19M5 12H19"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

const ShareIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Circle cx="18" cy="5" r="2" stroke="#fff" strokeWidth="1.8" />
    <Circle cx="6" cy="12" r="2" stroke="#fff" strokeWidth="1.8" />
    <Circle cx="18" cy="19" r="2" stroke="#fff" strokeWidth="1.8" />

    <Path
      d="M8 13.5L16 17.5M16 6.5L8 10.5"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </Svg>
);

const ThumbsUpIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 22V11M2 13V20C2 21.1 2.9 22 4 22H16.7C17.6 22 18.4 21.4 18.6 20.5L20.6 13.5C20.9 12.3 20 11 18.7 11H14V6C14 4.3 12.7 3 11 3L7 11"
      stroke="#fff"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EpisodeCard = ({ number, title }) => (
  <View style={styles.episodeCard}>
    <View style={styles.episodeThumbnail}>
      <Text style={styles.episodeNumber}>{number}</Text>
    </View>

    <View style={styles.episodeInfo}>
      <Text style={styles.episodeTitle}>{title}</Text>
      <Text style={styles.episodeDuration}>45m</Text>
    </View>

    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 12H18M18 12L13 7M18 12L13 17"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

export default function Movie() {

  const navigation = useNavigation();
  const route = useRoute();

  const { item } = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const isWebSeries = item.Type === 'Web Series';

  const checkDownload = async () => {

    const data = await AsyncStorage.getItem('downloads');

    if (data) {

      const downloads = JSON.parse(data);

      if (downloads.find(d => d.Title === item.Title)) {
        setIsDownloaded(true);
      } else {
        setIsDownloaded(false);
      }
    }
  };

  useEffect(() => {
    checkDownload();
  }, []);

  const onRefresh = async () => {

    try {

      setRefreshing(true);

      await checkDownload();

    } catch (e) {

      console.log("Refresh Error:", e);

    } finally {

      setRefreshing(false);
    }
  };

  const handleDownload = async () => {

    setIsLoading(true);

    const data = await AsyncStorage.getItem('downloads');

    let downloads = data
      ? JSON.parse(data)
      : [];

    if (!downloads.find(d => d.Title === item.Title)) {

      downloads.push(item);

      await AsyncStorage.setItem(
        'downloads',
        JSON.stringify(downloads)
      );
    }

    setTimeout(() => {

      setIsDownloaded(true);

      setIsLoading(false);

    }, 800);
  };

  const episodes = isWebSeries
    ? Array.from({ length: 5 }, (_, i) => ({
        number: i + 1,
        title: `Episode ${i + 1}`,
      }))
    : [];

  return (
    <View style={styles.root}>

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={true}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            colors={['#fff']}
            progressBackgroundColor="#111"
          />
        }
      >

        <View style={styles.heroContainer}>

          <Image
            source={{ uri: item.IMG }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          <LinearGradient
            colors={[
              'rgba(0,0,0,0.1)',
              'rgba(0,0,0,0.5)',
              '#000'
            ]}
            style={styles.gradient}
          />

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <BackIcon />
          </TouchableOpacity>

          <View style={styles.netflixBadge}>
            <Text style={styles.netflixBadgeText}>N</Text>

            <Text style={styles.netflixBadgeLabel}>
              {isWebSeries ? 'SERIES' : 'FILM'}
            </Text>
          </View>

          <View style={styles.heroBottom}>
            <Text style={styles.heroTitle}>
              {item.Title}
            </Text>
          </View>
        </View>

        <View style={styles.infoSection}>

          <View style={styles.metaRow}>

            {isWebSeries && (
              <Text style={styles.metaText}>
                {item.Seasons || 1} Seasons
              </Text>
            )}

            <View style={styles.hdBadge}>
              <Text style={styles.hdText}>HD</Text>
            </View>

            <View style={styles.ageBadge}>
              <Text style={styles.ageText}>U/A 16+</Text>
            </View>

          </View>

          <View style={styles.tagsRow}>

            <Text style={styles.tag}>
              #1 in India Today
            </Text>

            <Text style={styles.tagDot}>·</Text>

            <Text style={styles.tagText}>
              {isWebSeries
                ? 'Thriller · Drama · Mystery'
                : 'Action · Adventure · Sci-Fi'}
            </Text>

          </View>

          <TouchableOpacity
            style={styles.playBtn}
            activeOpacity={0.85}
          >
            <PlayIcon />
            <Text style={styles.playText}>Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.downloadBtn}
            activeOpacity={0.85}
            onPress={handleDownload}
            disabled={isLoading}
          >

            <DownloadIcon />

            {isLoading ? (

              <ActivityIndicator
                size="small"
                color="#fff"
              />

            ) : (

              <Text style={styles.downloadText}>
                {isDownloaded
                  ? 'Downloaded'
                  : 'Download'}
              </Text>

            )}

          </TouchableOpacity>

          <Text style={styles.description}>
            {isWebSeries
              ? `${item.Title} is a gripping series that keeps you on the edge of your seat with every episode.`
              : `${item.Title} is an action-packed film with stunning visuals and unforgettable moments.`
            }
          </Text>

          <Text style={styles.castText}>
            <Text style={styles.castLabel}>Cast: </Text>
            John Doe, Jane Smith, Alex Johnson
          </Text>

          <View style={styles.actionsRow}>

            <TouchableOpacity style={styles.actionBtn}>
              <PlusIcon />
              <Text style={styles.actionLabel}>My List</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <ThumbsUpIcon />
              <Text style={styles.actionLabel}>Rate</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
              <ShareIcon />
              <Text style={styles.actionLabel}>Share</Text>
            </TouchableOpacity>

          </View>

          <View style={styles.divider} />

          {isWebSeries && (

            <View style={styles.episodesSection}>

              <View style={styles.episodesHeader}>

                <Text style={styles.episodesTitle}>
                  Episodes
                </Text>

                <View style={styles.seasonPill}>
                  <Text style={styles.seasonPillText}>
                    Season 1 ▾
                  </Text>
                </View>

              </View>

              {episodes.map((ep) => (
                <EpisodeCard
                  key={ep.number}
                  number={ep.number}
                  title={ep.title}
                />
              ))}

            </View>
          )}

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            More Like This
          </Text>

          <Text style={styles.comingSoon}>
            More titles coming soon...
          </Text>

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  root: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },

  scroll: {
    flex: 1,
  },

  heroContainer: {
    width: SCREEN_W,
    height: SCREEN_H * 0.55,
  },

  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },

  backBtn: {
    position: 'absolute',
    top: ANDROID_SB + 12,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 6,
  },

  netflixBadge: {
    position: 'absolute',
    top: ANDROID_SB + 14,
    right: 16,
    alignItems: 'center',
  },

  netflixBadgeText: {
    color: '#E50914',
    fontSize: 22,
    fontWeight: '900',
  },

  netflixBadgeLabel: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 2,
  },

  heroBottom: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },

  heroTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    textAlign: 'center',
  },

  infoSection: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },

  metaText: {
    color: '#aaa',
    fontSize: 13,
  },

  hdBadge: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },

  hdText: {
    color: '#aaa',
    fontSize: 11,
    fontWeight: '600',
  },

  ageBadge: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },

  ageText: {
    color: '#aaa',
    fontSize: 11,
  },

  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },

  tag: {
    color: '#46d369',
    fontSize: 13,
    fontWeight: '600',
  },

  tagDot: {
    color: '#aaa',
    fontSize: 13,
  },

  tagText: {
    color: '#aaa',
    fontSize: 13,
  },

  playBtn: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 10,
  },

  playText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },

  downloadBtn: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },

  downloadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  description: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },

  castText: {
    color: '#aaa',
    fontSize: 13,
    marginBottom: 16,
  },

  castLabel: {
    color: '#666',
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  actionBtn: {
    alignItems: 'center',
    gap: 6,
  },

  actionLabel: {
    color: '#aaa',
    fontSize: 11,
  },

  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 16,
  },

  episodesSection: {
    marginBottom: 10,
  },

  episodesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  episodesTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  seasonPill: {
    backgroundColor: '#333',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  seasonPillText: {
    color: '#fff',
    fontSize: 13,
  },

  episodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },

  episodeThumbnail: {
    width: 100,
    height: 60,
    backgroundColor: '#222',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  episodeNumber: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  episodeInfo: {
    flex: 1,
  },

  episodeTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  episodeDuration: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  comingSoon: {
    color: '#555',
    fontSize: 13,
  },

});