import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { useFonts, Cairo_500Medium } from '@expo-google-fonts/cairo';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useNavigation } from '@react-navigation/native';

const Breathe = () => {
  const [fontsLoaded] = useFonts({
    CairoMed: Cairo_500Medium,
  });

  const [trigger, setTrigger] = useState(false);
  const confettiRef = useRef();
  const navigation = useNavigation();

  const youtubeVideoId = "odADwWzHR24";
  const videoEmbedURL = `https://www.youtube.com/embed/${youtubeVideoId}`;

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
          <Text style={styles.header}>Serenity Breathwork 🌬️</Text>
          <WebView 
            style={styles.video}
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
              x: 160, // Center horizontally assuming video width of 320
              y: 0 // Start from bottom
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
    width: 320, // Adjust width as needed
    height: 180, // Adjust height as needed
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

export default Breathe;
