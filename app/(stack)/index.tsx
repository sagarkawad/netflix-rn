import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatGrid } from 'react-native-super-grid';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'expo-router';
import { Movie } from "@/types/types";


export default function HomeScreen() {
  // Specify the type for the moviesDB state
  const [moviesDB, setMoviesDB] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getMovies() {
      const response = await axios.get("https://api.tvmaze.com/search/shows?q=all");
      setMoviesDB(response.data.map((item: any) => item.show)); // Adjusting to get the show data
    }

    getMovies();
  }, []);


  return (
    <SafeAreaView>
      <Text>Movies</Text>
      <FlatGrid
        itemDimension={100}
        data={moviesDB}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {router.push(`/(details)/${item.id}`)}} style={styles.movieDisplay}>
            <Text>{item.name}</Text>
            <Text>{item.network ? item.network.name : ''}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  movieDisplay: {
    height: 180,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
  }
});
