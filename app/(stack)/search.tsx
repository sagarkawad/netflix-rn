import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from "react";
import axios from "axios";
import { FlatGrid } from 'react-native-super-grid'; // Import FlatGrid from react-native-super-grid

export default function Search() {
  const [userInput, setUserInput] = useState(""); // Input state for search query
  const [movies, setMovies] = useState<any[]>([]); // State to store search results

  // Function to get movie data from API
  async function getMovieData(text: string) {
    try {
      const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${text}`);
      setMovies(response.data); // Set the fetched movie data to state
    } catch (error) {
      console.log("error", error);
    }
  }

  // Render each movie item
  const renderMovieItem = ({ item }: any) => (
    <View style={styles.movieCard}>
      <Image
        source={{ uri: item.show.image?.medium }} // Display movie poster image
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{item.show.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={userInput}
          onChangeText={(text) => {
            setUserInput(text);
            getMovieData(text);
          }}
          style={styles.input}
          placeholder="Search for movies..."
          placeholderTextColor="gray" // Light gray placeholder text
        />
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Display movies in a grid layout */}
      {movies.length > 0 && (
        <FlatGrid
          itemDimension={130} // Adjust the size of each grid item
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.show.id.toString()}
          spacing={10} // Space between grid items
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Black background like Netflix
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333', // Dark border color
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: '#333', // Dark background color for the input
    color: 'white', // White text color inside the input
  },
  searchButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E50914', // Netflix red for the search icon button
    padding: 10,
    borderRadius: 50,
  },
  movieCard: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#333', // Dark card background
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 5,
  },
  movieTitle: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white', // White movie title text
  },
});
