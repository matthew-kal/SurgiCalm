import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, Cairo_500Medium } from '@expo-google-fonts/cairo'; 

const Words = () => {
  const [fontsLoaded] = useFonts({
    CairoMed: Cairo_500Medium,
  });


  return (
    <ScrollView style={styles.scroll} >
        <View style={styles.container}>
        <Text style={[styles.header, fontsLoaded && { fontFamily: 'CairoMed' }]}>Self Radiance ✨</Text>
        <Text style={styles.paragraph}>
        Approaching breast cancer treatment can feel overwhelming, yet it's also a step towards reclaiming your health and vitality. As you prepare, imagine embodying the essence of serenity—allowing yourself to be calm and peaceful, even in times of uncertainty. This period is about more than medical preparation; it's about nurturing your inner strength and resilience.

        You're embarking on a journey that requires bravery and courage, qualities you already possess in abundance. Let these virtues be your guide, reminding you of your ability to face challenges head-on. Acknowledge the love and support around you, drawing strength from those who care about you.

        Think of this experience not just as a procedure but as a transformation, one that can bring new perspectives and possibilities into your life. Allow yourself to feel hopeful about the future, recognizing this step as part of a broader journey towards well-being.

        As you move forward, hold onto the belief that you have the power to navigate this path with grace. Your spirit and determination illuminate the way, proving that even in moments of change, your inner light remains unwavering. Trust in yourself, your decisions, and the process, knowing that each step brings you closer to a place of healing and renewed vitality.
        </Text>
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 20,
    backgroundColor: 'white', 
    
  },
  header: {
    fontSize: 40, 
    color: '#0077a8', 
    textAlign: 'center', 
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 25, 
    color: '#000', 
    textAlign: 'center', 
    lineHeight: 45, 
  }
});

export default Words;


