import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useFonts, Cairo_500Medium, Cairo_300Light } from '@expo-google-fonts/cairo';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';

export default function PatientPage() {
  const navigation = useNavigation();

  const [change1, setChange1] = useState(true);
  const [change2, setChange2] = useState(true);
  const [change3, setChange3] = useState(true);
  const [change4, setChange4] = useState(true);

  const [bubble1, setBubble1] = useState(0);
  const [bubble2, setBubble2] = useState(0);

  const [count, setCount] = useState(0);
  const [words, setWords] = useState(0);
  const [breathe, setBreathe] = useState(0);
  const [yoga, setYoga] = useState(0);
  const [workout, setWorkout] = useState(0);

  const [dimensions, setDimensions] = React.useState({
    window : Dimensions.get('window')
  })

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  }, []);

  const {window} = dimensions
  const windowWidth = window.width
  const windowHeight = window.height
  
  const boxWidth = windowWidth > 1000 ? '60%' : '100%'
  const buttonWidth = windowWidth > 600 ? '40%' : '100%'
  const headerText = windowWidth > 600 ? 35 : 25


  const handleWords = () => {
    navigation.navigate("Words");
    setChange1(false);
    setBubble1(prevBubble => prevBubble + 25);
    setBubble2(prevBubble => prevBubble + 2.5);
    setCount(prevCount => (prevCount + 1));
    setWords(prevWords => (prevWords + 1));
  };

  const handleBreathe = () => {
    navigation.navigate("Breathe");
    setChange2(false);
    setBubble1(prevBubble => prevBubble + 25);
    setBubble2(prevBubble => prevBubble + 2.5);
    setCount(prevCount => (prevCount + 1));
    setBreathe(prevBreathe => (prevBreathe + 1));
  };

  const handleYoga = () => {
    navigation.navigate("Yoga");
    setChange3(false);
    setBubble1(prevBubble => prevBubble + 25);
    setBubble2(prevBubble => prevBubble + 2.5);
    setCount(prevCount => (prevCount + 1));
    setYoga(prevYoga => (prevYoga + 1));
  };

  const handleExersize = () => {
    navigation.navigate("Workout");
    setChange4(false);
    setBubble1(prevBubble => prevBubble + 25);
    setBubble2(prevBubble => prevBubble + 2.5);
    setCount(prevCount => (prevCount + 1));
    setWorkout(prevWorkout => (prevWorkout + 1));
  };

  const [fontsLoaded] = useFonts({
    CairoMed: Cairo_500Medium,
    CairoLite: Cairo_300Light,
  });

  if (!fontsLoaded) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <ScrollView 
      style={styles.container}    >
      <View style={styles.header}>
        <Text style={[styles.header_text, {fontSize: headerText}]}>Hello, John Doe!</Text>
        <Text style={[styles.header_text, {fontSize: headerText}]}>MRN: 1234567</Text>
      </View>

      <View style={[styles.infoContainer, styles.QuoteBox]}>
        <Text style={styles.detailHeader}>Quote Of The Day</Text>
        <Text style={styles.QuoteDetail}>
          “Keep your face always toward the sunshine, 
          and shadows will fall behind you.” – Walt Whitman
        </Text>
      </View>

      <View style={[styles.mainContainer, {width: boxWidth }]}>
        <View style={styles.infoContainer}>
          <Text style={styles.detailHeader}>Daily Progress</Text>
          <Text style={styles.detail}>You have completed {count} modules today</Text>
          <Progress.Circle thickness={6} showsText={true} size={150} progress={bubble1 / 100}/>
          <View style={styles.blueLine}></View>
          <Text style={[styles.detailHeader, styles.helper]}>Today's Modules</Text>
          
          { change1 === false && change2 === false && change3 === false && change4 === false ?
          <>
            <Text style={styles.detail}>All Modules Complete ✅</Text>
          </>
          :
          <>
            <Text style={styles.detail}>{change1 ? 'Self Radiance ✨' : 'Module 1: ✅'}</Text>
            <Text style={styles.detail}>{change2 ? 'Serenity Breathwork 🌬️' : 'Module 2: ✅'}</Text>
            <Text style={styles.detail}> {change3 ? 'ZenFlow Yoga 🧘' : 'Module 3: ✅'}</Text>
            <Text style={styles.detail}> {change4 ? 'Workout 🏃' : 'Module 4: ✅'}</Text>
          </>
          }
        </View>

        {
          change1 === false && change2 === false && change3 === false && change4 === false ? null : (
            <View style={styles.infoContainer}>
              <Text style={[styles.detailHeader, styles.placeholder]}>Select A Module</Text>

              {change1 && <TouchableOpacity onPress={handleWords} style={[styles.startButton, {width: buttonWidth}]}>
                <Text style={styles.buttonText}>Start Self Radiance</Text>
              </TouchableOpacity>}
              <View style={styles.whiteLine}></View>

              {change2 && <TouchableOpacity onPress={handleBreathe} style={[styles.startButton, {width: buttonWidth}]}>
                <Text style={styles.buttonText}>Start Serenity Breathwork</Text>
              </TouchableOpacity>}
              <View style={styles.whiteLine}></View>

              {change3 && <TouchableOpacity onPress={handleYoga} style={[styles.startButton, {width: buttonWidth}]}>
                <Text style={styles.buttonText}>Start ZenFlow Yoga</Text>
              </TouchableOpacity>}
              <View style={styles.whiteLine}></View>

              {change4 && <TouchableOpacity onPress={handleExersize} style={[styles.startButton, {width: buttonWidth}]}>
                <Text style={styles.buttonText}>Start Workout</Text>
              </TouchableOpacity>}
            </View>
          )
        }

        <View style={styles.infoContainer}>
          <Text style={styles.detailHeader}>Recovery Progress</Text>
          <Text style={styles.detail}>You have completed {count} modules all time</Text>
          <Progress.Circle thickness={6} showsText={true}  size={150} progress={bubble2 / 100}/>
          <View style={styles.blueLine}></View>
          <Text style={[styles.detailHeader, styles.helper]}>Total completed modules</Text>
          <Text style={styles.detail}>Words of affirmations: {words}</Text>
          <Text style={styles.detail}>Breathing Exercises: {breathe}</Text>
          <Text style={styles.detail}>Yoga & Meditation: {yoga}</Text>
          <Text style={styles.detail}>Workouts: {workout}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  header_text: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 4,
    color: '#0077a8',
    fontFamily: 'CairoMed',
  },
  mainContainer: {
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '60%',
    flex: 1, 
    flexDirection: 'column'
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailHeader: {
    fontFamily: 'CairoMed',
    fontSize: 27,
    color: '#0077a8',
    textAlign: 'center',
    marginBottom: 4,
    marginTop: -5,
  },
  detail: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: 'center',
    lineHeight: 25,
    fontFamily: 'CairoLite',
  },
  bold: {
    fontWeight: 'bold',
  },
  QuoteBox: {
    alignItems: "center",
  },
  QuoteDetail: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'CairoLite',
  },
  blueLine: {
    height: 4,
    borderRadius: 100,
    backgroundColor: '#0077a8',
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  whiteLine: {
    height: 7,
    borderRadius: 100,
    backgroundColor: 'white',
    width: '90%',
    marginVertical: 10,
    alignSelf: 'center',
  },
  startButton: {
    backgroundColor: '#0077a8',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'CairoMed',
    textAlign: 'center',
  },
  placeholder: {
    marginBottom: 10,
  },
});


