import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFonts, Cairo_500Medium, Cairo_300Light } from '@expo-google-fonts/cairo'; // Import the Cairo font
import Progress from '../components/progress';
import { ThemedButton } from "react-native-really-awesome-button";
import { useNavigation } from '@react-navigation/native'; 

export default function PatientPage() {
  const navigation = useNavigation(); 

  const patientInfo = {
    name: "John Doe",
    dailyModules: 0,
    completedModules: 0,
    incompleteModules: 35,
    MRN: 1234567,
  };

  const handleModule = () => {
    navigation.navigate("Module");
  };

  const [fontsLoaded] = useFonts({
    CairoMed: Cairo_500Medium,
    CairoLite: Cairo_300Light,
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}> 
        <Text style={styles.name}>Hello, {patientInfo.name}!</Text>
        <Text style={styles.MRN}>MRN: {patientInfo.MRN}</Text>
      </View>

      <View style={[styles.infoContainer, styles.QuoteBox]}>
        <Text style={styles.detailHeader}> Quote Of The Day</Text>
        <Text style={styles.QuoteDetail}> 
          “Keep your face always toward the sunshine, 
          and shadows will fall behind you.” – Walt Whitman
        </Text> 
      </View>
      <View style={styles.MainContainer}> 
        <View style={styles.infoContainer}>
          <Text style={styles.detailHeader}>Daily Progress</Text>
          <Text style={styles.detail}>You have completed {patientInfo.dailyModules} modules today</Text>
          <Text style={styles.detail}> Today's progress: {patientInfo.dailyModules}% finished</Text>
          <Progress size={150} progress={0}/>
          <View style={styles.blueLine}></View>
          <Text style={[styles.detailHeader, styles.helper]}> Today's Modules</Text>
          <Text style={styles.detail}> Self Radiance ✨</Text>
          <Text style={styles.detail}> Serenity Breathwork 🌬️</Text>
          <Text style={styles.detail}> ZenFlow Yoga 🧘</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.detailHeader, styles.placeholder]}>Next Module: Self Radiance ✨</Text>
          <ThemedButton onPress={handleModule} style={styles.startButton} name="rick" type="primary">Start Module</ThemedButton>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.detailHeader}>Recovery Progress</Text>
          <Text style={styles.detail}>You have completed {patientInfo.completedModules} modules all time</Text>
          <Text style={styles.detail}>All time progress: {patientInfo.completedModules}%</Text>
          <Progress size={150} progress={0}/>
          <View style={styles.blueLine}></View>
          <Text style={[styles.detailHeader, styles.helper]}>Total completed modules</Text>
          <Text style={styles.detail}>Words of affirmations: 0</Text>
          <Text style={styles.detail}>Breathing Exercises: 0</Text>
          <Text style={styles.detail}>Yoga & Meditation: 0</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  MainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    padding: 20,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  QuoteBox: {
    flex: 1, 
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  detailHeader:{
    fontFamily: 'CairoMed',
    fontSize: 27,
    color: '#0077a8',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: -5,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  name: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 4,
    color: '#0077a8',
    fontFamily: 'CairoMed',
  },
  MRN: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    marginRight: 4,
    color: '#0077a8',
    fontFamily: 'CairoMed',
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    lineHeight: 25,
  },
  QuoteDetail: {
    fontSize: 20,
    textAlign: 'center',
  },
  blueLine: {
    height: 4, 
    borderRadius: 100,
    backgroundColor: '#0077a8', 
    width: '90%', 
    marginVertical: 10, 
    alignSelf: 'center', 
  },
  placeholder: {
    marginBottom: 10,
  }
});
