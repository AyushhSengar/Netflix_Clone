import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { responsiveHeight } from 'react-native-responsive-dimensions';
export default function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
    try {
        setRefreshing(true);
        await loadDownloads();
    } catch (e) {
        console.log('Refresh error:', e);
    } finally {
        setRefreshing(false); 
    }
    };
    
  const loadDownloads = async () => {
    try {
      const data = await AsyncStorage.getItem('downloads');
      if (data) setDownloads(JSON.parse(data));
      else setDownloads([]);
    } catch (e) {
      console.log(e);
    }
  };

    const removeItem = async (title) => {
    try {
        setRemovingId(title);

        const data = await AsyncStorage.getItem('downloads');
        let downloads = data ? JSON.parse(data) : [];

        const updated = downloads.filter(item => item.Title !== title);

        // fake delay for UX (optional but matches your download spinner)
        setTimeout(async () => {
        await AsyncStorage.setItem('downloads', JSON.stringify(updated));
        setDownloads(updated);
        setRemovingId(null);
        }, 600);

    } catch (e) {
        console.log('Remove error:', e);
        setRemovingId(null);
    }
    };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.IMG }} style={styles.image} />

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {item.Title}
        </Text>
        <Text style={styles.sub}>Downloaded</Text>
      </View>

    <TouchableOpacity
    onPress={() => removeItem(item.Title)}
    disabled={removingId === item.Title}
    >
    {removingId === item.Title ? (
        <ActivityIndicator size="small" color="#e50914" />
    ) : (
        <Text style={styles.remove}>Remove</Text>
    )}
    </TouchableOpacity>
    </View>
  );


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.header}>Downloads</Text>

    <FlatList
    data={downloads}
    keyExtractor={(item, index) => index.toString()}
    renderItem={renderItem}
    showsVerticalScrollIndicator={false}

    refreshing={refreshing}
    onRefresh={onRefresh}

    contentContainerStyle={{ flexGrow: 1 }}

    ListEmptyComponent={
        <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No Downloads</Text>
        <Text style={styles.emptyText}>
            Movies and shows you download will appear here.
        </Text>
        </View>
    }
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 12,
    paddingTop:responsiveHeight(4),
  },

  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 15,
    textAlign:"center",
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  image: {
    width: 110,
    height: 65,
    borderRadius: 4,
    backgroundColor: '#222',
  },

  info: {
    flex: 1,
    marginLeft: 10,
  },

  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  sub: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },

  remove: {
    color: '#e50914',
    fontSize: 12,
    fontWeight: '600',
  },

  // ── Empty State ──

  emptyContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  emptyText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 13,
  },
});