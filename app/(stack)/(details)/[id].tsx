import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { moviesDBSelectorQuery } from '@/recoil/atoms';

const DetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const movie = useRecoilValueLoadable(moviesDBSelectorQuery);
  
  const [movieDetails, setMovieDetails] = useState<any>(null);
  
  useEffect(() => {
    if (movie.state === "hasValue") {
      const foundMovie = movie.contents.find((el: any) => el.id === Number(id));
      setMovieDetails(foundMovie);
    }
  }, [movie, id]);
  
  if (movie.state === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (movie.state === 'hasError' || !movieDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching movie data.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: movieDetails.image?.original }}
        style={styles.posterImage}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movieDetails.name}</Text>
        <Text style={styles.subtitle}>{movieDetails.language} | {movieDetails.status}</Text>
        <Text style={styles.summary}>{movieDetails.summary.replace(/<\/?[^>]+(>|$)/g, "")}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genres</Text>
          <Text style={styles.sectionContent}>{movieDetails.genres.join(', ')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Network</Text>
          <Text style={styles.sectionContent}>{movieDetails.network?.name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rating</Text>
          <Text style={styles.sectionContent}>{movieDetails.rating?.average || 'No Rating Available'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Premiered</Text>
          <Text style={styles.sectionContent}>{movieDetails.premiered}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Official Website</Text>
          <Text style={styles.sectionContent}>
            <Text style={styles.link} onPress={() => Linking.openURL(movieDetails.officialSite)}>
              {movieDetails.officialSite}
            </Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // Black background like Netflix
    padding: 20,
  },
  posterImage: {
    width: '100%',
    height: 350,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: '#E50914', // Netflix red
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    color: 'white',
    marginBottom: 15,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionContent: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  link: {
    color: '#E50914', // Netflix red for links
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  loadingText: {
    color: 'white',
    fontSize: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141414',
  },
  errorText: {
    color: 'white',
    fontSize: 20,
  },
});

export default DetailsScreen;
