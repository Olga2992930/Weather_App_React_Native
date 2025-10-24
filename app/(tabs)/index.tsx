import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

export default function HomeTab() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const saved = await AsyncStorage.getItem('favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

    const saveFavorites = async (updated: string[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
      setFavorites(updated);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

    const addFavorite = () => {
    if (!city.trim()) return;
    if (!favorites.includes(city)) {
      const updated = [...favorites, city];
      saveFavorites(updated);
      alert(`${city} added to favorites!`);
    } else {
      alert(`${city} is already in favorites.`);
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert('City not found!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a city..."
        value={city}
        onChangeText={setCity}
      />

      <Button title="Get weather" onPress={handleSearch} />

      {weather && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.desc}>{weather.weather[0].description}</Text>
          <Image
            style={styles.icon}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
          />

          <TouchableOpacity style={styles.favoriteButton} onPress={addFavorite}>
            <Text style={styles.favoriteText}>⭐ Add to favorites</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 32,
    marginVertical: 5,
  },
  desc: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  icon: {
    width: 100,
    height: 100,
  },
  favoriteButton: {
    marginTop: 10,
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  favoriteText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
