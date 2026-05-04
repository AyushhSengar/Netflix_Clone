import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';

import Svg, { Circle, Path } from 'react-native-svg';

// ─── Search Icon ─────────────────────────────────────────────────
const SearchIcon = ({ color = '#888' }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke={color} strokeWidth="2" />
    <Path d="M16.5 16.5L21 21" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// ─── Clear Icon ──────────────────────────────────────────────────
const ClearIcon = ({ color = '#888' }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" fill="#444" />
    <Path d="M9 9L15 15M15 9L9 15" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

// ─── Featured Card (shown before search) ─────────────────────────
const FeaturedCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.featuredCard} onPress={onPress} activeOpacity={0.75}>
    <Image source={{ uri: item.IMG }} style={styles.featuredPoster} resizeMode="cover" />
    {/* Gradient overlay */}
    <View style={styles.featuredOverlay} />
    <View style={styles.featuredInfo}>
      <View style={[
        styles.badge,
        { backgroundColor: item.Type === 'Movie' ? '#E50914' : '#0071eb' }
      ]}>
        <Text style={styles.badgeText}>{item.Type}</Text>
      </View>
      <Text style={styles.featuredTitle} numberOfLines={2}>{item.Title}</Text>
      {item.Seasons && (
        <Text style={styles.featuredSeasons}>{item.Seasons} Seasons</Text>
      )}
    </View>
  </TouchableOpacity>
);

export default function Search() {
  const navigation = useNavigation();
  const inputRef = useRef(null);

  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const [allData, setAllData] = useState([]);
  const [results, setResults] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // ─── Fetch all Movies + Web Series on mount ───────────────────
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [moviesSnap, seriesSnap] = await Promise.all([
          getDocs(collection(db, 'Movies')),
          getDocs(collection(db, 'Web_Series')),
        ]);

        const movies = moviesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const series = seriesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        const combined = [...movies, ...series];

        setAllData(combined);

        // shuffle helper
        const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

        // pick 4 from each
        const randomMovies = shuffle(movies).slice(0, 4);
        const randomSeries = shuffle(series).slice(0, 4);

        // combine and shuffle again
        const mixed = shuffle([...randomMovies, ...randomSeries]);

        setFeatured(mixed);
        
      } catch (err) {
        console.log('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ─── Filter on query change ───────────────────────────────────
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = allData.filter((item) =>
      item.Title?.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query, allData]);

  // ─── Render each search result ────────────────────────────────
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.7}
      onPress={() => navigation.navigate('Movie', { item })}
    >
      <Image source={{ uri: item.IMG }} style={styles.poster} resizeMode="cover" />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.Title}</Text>
        <View style={[
          styles.badge,
          { backgroundColor: item.Type === 'Movie' ? '#E50914' : '#0071eb' }
        ]}>
          <Text style={styles.badgeText}>{item.Type}</Text>
        </View>
        {item.Seasons && (
          <Text style={styles.seasons}>{item.Seasons} Seasons</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  // ─── Default state — shown before user types ──────────────────
  const renderDefault = () => (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.defaultContainer}>
      <Text style={styles.suggestedLabel}>Suggested for you</Text>
      {featured.map((item) => (
        <FeaturedCard
          key={item.id}
          item={item}
          onPress={() => navigation.navigate('Movie', { item })}
        />
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.root}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {/* ── Search Bar ── */}
      <View style={styles.searchContainer}>
        {focused || query.length > 0 ? (
          <View style={styles.searchBarActive}>
            <SearchIcon color="#888" />
            <TextInput
              ref={inputRef}
              style={styles.input}
              value={query}
              onChangeText={setQuery}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder=""
              placeholderTextColor="#888"
              autoFocus
              selectionColor="#1877f2"
              autoCapitalize="none"
            />
            {query.length > 0 && (
              <TouchableOpacity onPress={() => setQuery('')}>
                <ClearIcon color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <TouchableOpacity
            style={styles.searchBarDefault}
            onPress={() => {
              setFocused(true);
              inputRef.current?.focus();
            }}
            activeOpacity={0.8}
          >
            <SearchIcon color="#888" />
            <Text style={styles.placeholder}>Search</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Content ── */}
      {loading ? (
        <ActivityIndicator size="large" color="#E50914" style={{ marginTop: 40 }} />
      ) : query.trim() === '' ? (
        // Show featured before any search
        renderDefault()
      ) : results.length === 0 ? (
        // No results
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No results for "{query}"</Text>
          <Text style={styles.emptyText}>Try a different name</Text>
        </View>
      ) : (
        // Search results
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
}

const ANDROID_SB = Platform.OS === 'android' ? StatusBar.currentHeight ?? 24 : 0;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: ANDROID_SB + 10,
  },

  // ── Search Bar
  searchContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBarDefault: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchBarActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 10,
  },
  placeholder: {
    color: '#888',
    fontSize: 16,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 4,
  },

  // ── Default / Featured
  defaultContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  suggestedLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
  },
  featuredCard: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 14,
    height: 200,
    backgroundColor: '#1a1a1a',
  },
  featuredPoster: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.52)',
  },
  featuredInfo: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    right: 14,
    gap: 6,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  featuredSeasons: {
    color: '#ccc',
    fontSize: 12,
  },

  // ── Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
  },

  // ── Search Results
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 14,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    overflow: 'hidden',
  },
  poster: {
    width: 100,
    height: 130,
  },
  cardInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
    gap: 8,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  seasons: {
    color: '#aaa',
    fontSize: 12,
  },
});