import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import { responsiveHeight } from 'react-native-responsive-dimensions';

export default function Downloads() {

  const navigation = useNavigation();

  const [downloads, setDownloads] = useState([]);
  const [removingId, setRemovingId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadDownloads = async () => {

    try {

      const data = await AsyncStorage.getItem('downloads');

      if (data) {

        const parsed = JSON.parse(data);

        setDownloads(parsed.reverse());

      } else {

        setDownloads([]);
      }

    } catch (e) {

      console.log(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadDownloads();
    }, [])
  );

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

  const removeItem = async (title) => {

    try {

      setRemovingId(title);

      const data = await AsyncStorage.getItem('downloads');

      let downloads = data
        ? JSON.parse(data)
        : [];

      const updated = downloads.filter(
        item => item.Title !== title
      );

      setTimeout(async () => {

        await AsyncStorage.setItem(
          'downloads',
          JSON.stringify(updated)
        );

        setDownloads(updated);

        setRemovingId(null);

      }, 600);

    } catch (e) {

      console.log('Remove error:', e);

      setRemovingId(null);
    }
  };

  const renderItem = ({ item }) => (

    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        navigation.navigate('Movie', { item })
      }
    >

      <View style={styles.card}>

        <Image
          source={{ uri: item.IMG }}
          style={styles.image}
        />

        <View style={styles.info}>

          <Text
            numberOfLines={1}
            style={styles.title}
          >
            {item.Title}
          </Text>

          <Text style={styles.sub}>
            Downloaded
          </Text>

        </View>

        <TouchableOpacity
          onPress={() => removeItem(item.Title)}
          disabled={removingId === item.Title}
        >

          {removingId === item.Title ? (

            <ActivityIndicator
              size="small"
              color="#e50914"
            />

          ) : (

            <Text style={styles.remove}>
              Remove
            </Text>

          )}

        </TouchableOpacity>

      </View>

    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <StatusBar barStyle="light-content" />

      <Text style={styles.header}>
        Downloads
      </Text>

      <FlatList
        data={downloads}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}

        showsVerticalScrollIndicator={false}

        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            colors={['#fff']}
            progressBackgroundColor="#111"
          />
        }

        contentContainerStyle={{ flexGrow: 1 }}

        ListEmptyComponent={
          <View style={styles.emptyContainer}>

            <Text style={styles.emptyTitle}>
              No Downloads
            </Text>

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
    paddingTop: responsiveHeight(4),
  },

  header: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 15,
    textAlign: 'center',
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