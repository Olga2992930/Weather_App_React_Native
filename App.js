import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ScrollView } from 'react-native-web';
import { use, useState } from 'react';

function Nav() {
 const [activePage, setActivePage] = useState("home")
  return (
    <View>
      <Button title={"Home"} onPress= {() => setActivePage("home")} />
      <Button title={"Favoriter"} onPress= {() => setActivePage("favoriter")} />
      <Button title={"Inställningar"} onPress= {() => setActivePage("inställningar")} />
        
    </View>
  )
}

export default function App() {
  return (

    <View style={styles.container}>
      <Nav />
      <Text style={styles.text}>Hej och vällkommen till min väderapp!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "blue"
  }

});
