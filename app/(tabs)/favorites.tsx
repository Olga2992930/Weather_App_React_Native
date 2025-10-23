import { View, Text } from 'react-native';
import {Link} from "expo-router"

export default function FavoritesTab() {
  return (
    <View>
      <Text>This is favorites page</Text>
      <Link href ="/city" >Här är länkan till city</Link>
    </View>
  );
}