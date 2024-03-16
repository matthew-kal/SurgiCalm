import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFonts, Cairo_500Medium } from '@expo-google-fonts/cairo';

const Yoga = () => {
  const [fontsLoaded] = useFonts({
    CairoMed: Cairo_500Medium,
  });

  // State to hold the current window dimensions
  const [currentDimensions, setCurrentDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    // Handler to call when dimensions change
    const handleDimensionsChange = ({ window }) => {
      setCurrentDimensions(window);
    };

    // Add event listener
    Dimensions.addEventListener('change', handleDimensionsChange);

    // Remove event listener on cleanup
    return () => {
      Dimensions.removeEventListener('change', handleDimensionsChange);
    };
  }, []);

  const youtubeVideoId = "MmFZ_aqNX90";
  const videoEmbedURL = `https://www.youtube.com/embed/${youtubeVideoId}`;

  // Determine if the device is likely a tablet
  const isTablet = currentDimensions.width / currentDimensions.height < 0.75 && Math.max(currentDimensions.width, currentDimensions.height) > 800;

  // Adjust video size dynamically based on current orientation and device type
  const videoSize = isTablet
    ? { width: currentDimensions.width * 0.8, height: currentDimensions.height * 0.7 }
    : { width: currentDimensions.width * 0.9, height: currentDimensions.width * 0.9 * (9 / 16) };

  return (
    <ScrollView style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.header}> ZenFlow Yoga 🧘 </Text>
        <WebView 
          style={[styles.video, videoSize]}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ uri: videoEmbedURL }}
        />
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
    marginBottom: 10,
    fontFamily: 'CairoMed',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    // Base style for the video
    marginTop: 20, // Adding margin for better spacing
  },
});

export default Yoga;

