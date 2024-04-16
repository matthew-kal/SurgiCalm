import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFonts, Cairo_500Medium } from '@expo-google-fonts/cairo';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useNavigation } from '@react-navigation/native';

const Workout = () => {
  const [fontsLoaded] = useFonts({
    CairoMed: Cairo_500Medium,
  });

  const [trigger, setTrigger] = useState(false);
  const [currentDimensions, setCurrentDimensions] = useState(Dimensions.get('window'));
  const confettiRef = useRef();
  const navigation = useNavigation();

  useEffect(() => {
    const handleDimensionsChange = ({ window }) => {
      setCurrentDimensions(window);
    };

    Dimensions.addEventListener('change', handleDimensionsChange);
    return () => {
      Dimensions.removeEventListener('change', handleDimensionsChange);
    };
  }, []);

  const youtubeVideoId = "5UKBmjrCXTM";
  const videoEmbedURL = `https://www.youtube.com/embed/${youtubeVideoId}`;

  const isTablet = currentDimensions.width / currentDimensions.height < 0.75 && Math.max(currentDimensions.width, currentDimensions.height) > 800;
  const videoSize = isTablet
    ? { width: currentDimensions.width * 0.6, height: currentDimensions.height * 0.3 }
    : { width: currentDimensions.width * 0.7, height: currentDimensions.width * 0.7 * (9 / 16) };

  const handleCompleteModule = () => {
    setTrigger(true);  // Start confetti on button click
    // Set a timeout to navigate after 2 seconds
    setTimeout(() => {
      if (navigation && navigation.navigate) {
        navigation.navigate('Patient');
      }
      setTrigger(false); // Reset trigger to hide confetti after navigation
    }, 2000);
  };

  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <Text style={styles.header}>Workout 🏃</Text>
          <WebView 
            style={[styles.video, videoSize]}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            source={{ uri: videoEmbedURL }}
          />
        </View>
        <TouchableOpacity onPress={handleCompleteModule} style={styles.backButton}>
          <Text style={styles.buttonText}>Complete Module</Text>
        </TouchableOpacity>
        {trigger && (
          <ConfettiCannon
            count={200}
            origin={{
              x: currentDimensions.width / 2, // Center horizontally
              y: currentDimensions.height // Start from bottom
            }}
            ref={confettiRef}
            fallSpeed={1500}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'white',
  },
  header: {
    fontSize: 40, 
    color: '#0077a8', 
    textAlign: 'center', 
    fontFamily: 'CairoMed',
    marginTop: 25,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    marginBottom: 20,
  },
  video: {
    borderRadius: 10, 
    overflow: 'hidden', 
    borderColor: '#0077a8', 
    borderWidth: 5,
  },
  backButton: {
    backgroundColor: '#0077a8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'CairoMed',
    textAlign: 'center',
  },
});

export default Workout;










