import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatGrid } from 'react-native-super-grid';
import { useRecoilValueLoadable } from "recoil";
import { useRouter } from 'expo-router';
import { moviesDBSelectorQuery } from "@/recoil/atoms";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Movies</Text>
      <MovieList />
    </SafeAreaView>
  );
}

function MovieList() {
  const moviesDB = useRecoilValueLoadable(moviesDBSelectorQuery);
  const router = useRouter();

  switch (moviesDB.state) {
    case 'hasValue':
      return (
        <FlatGrid
          itemDimension={100}
          data={moviesDB.contents} // Use contents, not moviesDB directly
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push(`/(details)/${item.id}`);
              }}
              style={styles.movieDisplay}
            >
              <Text style={styles.movieTitle}>{item.name}</Text>
              <Text>{item.network ? item.network.name : 'No Network Info'}</Text>
            </TouchableOpacity>
          )}
        />
      );
    case 'loading':
      return (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      );
    case 'hasError':
      return (
        <View style={styles.errorContainer}>
          <Text>Error fetching movies.</Text>
        </View>
      );
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieDisplay: {
    height: 180,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  movieTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
