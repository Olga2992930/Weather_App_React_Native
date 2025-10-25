import { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsTab() {
  const [isCelsius, setIsCelsius] = useState(true);

  // Läser sparad inställning vid laddning
  useEffect(() => {
    const loadSetting = async () => {
      try {
        const saved = await AsyncStorage.getItem('temperatureUnit');
        if (saved) {
          setIsCelsius(saved === 'C');
        }
      } catch (error) {
        console.error('Error loading setting:', error);
      }
    };
    loadSetting();
  }, []);

  // Sparar inställning när switch ändras
  const toggleSwitch = async () => {
    try {
      const newValue = !isCelsius;
      setIsCelsius(newValue);
      await AsyncStorage.setItem('temperatureUnit', newValue ? 'C' : 'F');
      Alert.alert('Saved', `Temperature unit set to ${newValue ? 'Celsius' : 'Fahrenheit'}`);
    } catch (error) {
      console.error('Error saving setting:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Temperature Unit</Text>
      <View style={styles.row}>
        <Text style={styles.label}>{isCelsius ? 'Celsius' : 'Fahrenheit'}</Text>
        <Switch value={isCelsius} onValueChange={toggleSwitch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center' },
  label: { fontSize: 18, marginRight: 10 },
});
