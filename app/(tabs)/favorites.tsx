import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function FavoritesTab() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  // Läser favoriter när sidan öppnas
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await AsyncStorage.getItem('favorites');
        if (saved) setFavorites(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  // Tar bort favorit
  const removeFavorite = async (city: string) => {
    try {
      const updated = favorites.filter(fav => fav !== city);
      setFavorites(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
      Alert.alert('Removed', `${city} was removed from favorites.`);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Cities</Text>

      {favorites.length === 0 ? (
        <Text>No favorite cities yet</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {/* Tryck på stad för att visa vädret */}
              <TouchableOpacity onPress={() => router.push(`/?city=${item}`)}>
                <Text style={styles.city}>{item}</Text>
              </TouchableOpacity>

              {/* Ta bort favorit */}
              <TouchableOpacity onPress={() => removeFavorite(item)}>
                <Text style={styles.remove}>🗑️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  city: {
    fontSize: 18,
  },
  remove: {
    fontSize: 18,
    color: 'red',
  },
});
