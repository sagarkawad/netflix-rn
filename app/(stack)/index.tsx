import { Text, StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatGrid } from 'react-native-super-grid';
import { useRecoilValueLoadable } from "recoil";
import { useRouter } from 'expo-router';
import { moviesDBSelectorQuery } from "@/recoil/atoms";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the search icon

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Movies</Text>
        <TouchableOpacity style={styles.searchIcon} onPress={() => {router.push("./search")}}>
          <Icon name="search" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <MovieList />
    </SafeAreaView>
  );
}

function MovieList() {
  const moviesDB = useRecoilValueLoadable(moviesDBSelectorQuery);
  const router = useRouter();

  switch (moviesDB.state) {
    case 'hasValue':
      console.log(moviesDB.contents[0].image)
      return (
        <FlatGrid
          itemDimension={150}
          data={moviesDB.contents} // Use contents, not moviesDB directly
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push(`/(details)/${item.id}`);
              }}
              style={styles.movieDisplay}
            >
              <Image 
                source={{ uri: item?.image?.medium || 'https://via.placeholder.com/150' }} 
                style={styles.movieThumbnail} 
              />
              <Text style={styles.movieTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      );
    case 'loading':
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      );
    case 'hasError':
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error fetching movies.</Text>
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
    backgroundColor: '#141414', // Black background like Netflix
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // White header text
  },
  searchIcon: {
    padding: 10,
  },
  movieDisplay: {
    backgroundColor: '#333', // Dark gray background for each movie card
    borderRadius: 8,
    margin: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  movieThumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  movieTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white', // White text for movie titles
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
  },
});
