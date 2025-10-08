import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';


export default function HomeTab() {
  const [city, setCity] = useState('')
  const handleSearch = () => {console.log('Searching weather for:', city)}
  return (
    <View>
      <Text>Weather App</Text>
      <TextInput
       placeholder='Enter a city...'
       value = {city}
       onChangeText ={setCity}
       />
       <Button title = "Get weather" onPress = {handleSearch} />
    </View>
  );
}
