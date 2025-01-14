import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie } from '@/types/types';

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
      setMovie(response.data);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{movie.name}</Text>
      <Text>{movie.network ? movie.network.name : 'No Network Info'}</Text>
      {/* Add more movie details here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
