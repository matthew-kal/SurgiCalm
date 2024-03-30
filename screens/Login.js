import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, TextInput, Animated, ScrollView } from 'react-native';
import { useFonts, Cairo_500Medium, Cairo_300Light } from '@expo-google-fonts/cairo'; 

export default function LoginBox({ navigation }) {
  const [showNurseForm, setShowNurseForm] = useState(false);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [renderView, setRenderView] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  function viewHelper() {
    setRenderView(prevState => !prevState);
  }

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  const handleNurseLogin = () => {
    navigation.navigate("Nurse");
  };

  const handleNurse = () => {
    setShowNurseForm(!showNurseForm);
    setShowPatientForm(false);
  };


  const handlePatientLogin = () => {
    navigation.navigate("Patient");
  };

  const handlePatient = () => {
    setShowPatientForm(!showPatientForm);
    setShowNurseForm(false);
  };

  const NurseLoginButton = ({ onPress, title }) => {
    return (
      <TouchableOpacity style={styles.finalLoginBtn} onPress={onPress}>
        <Text style={styles.smallBtnText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const PatientLoginButton = ({ onPress, title }) => {
    return (
      <TouchableOpacity style={styles.finalLoginBtn} onPress={onPress}>
        <Text style={styles.smallBtnText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  // Load the Cairo font
  const [fontsLoaded] = useFonts({
    CairoMed: Cairo_500Medium,
    CairoLite: Cairo_300Light,
  });

  // Check if the font is loaded before rendering the component
  if (!fontsLoaded) {
    return null; // Return null or a loading indicator while the font is loading
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../hackensack.jpg')} style={styles.logoImage} />
          <Image source={require('../MMP.png')} style={styles.logoImageRight} />
        </View>

        <View style={styles.boxStyle}>
          <Animated.Text style={[styles.logo, { opacity: fadeAnim, transform: [{ translateX: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }) }] }]}>
            Welcome To <Text style={styles.italicText}>SurgiCalm™</Text>
          </Animated.Text>

          {/* Nurse Login Form */}

          <TouchableOpacity style={styles.loginBtn} onPress={handleNurse}>
            <Text style={styles.btnText}>Caregiver Login 🩺</Text>
            <Text style={styles.secondBtnText}> If you are a professional, please click here.</Text>
          </TouchableOpacity>
          {showNurseForm && (
            <View style={styles.fieldsContainer}>
              <TextInput style={styles.input} placeholder="Nurse Username" onFocus={viewHelper} onBlur={viewHelper} />
              <TextInput style={styles.input} placeholder="Nurse Password" secureTextEntry={true} onFocus={viewHelper} onBlur={viewHelper} />
              <NurseLoginButton onPress={handleNurseLogin} title="Login" />
            </View>
          )}

          {/* Separator Line and 'or' */}
          <View style={styles.separator}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line}></View>
          </View>

          {/* Patient Login Form */}
          <TouchableOpacity style={styles.loginBtn} onPress={handlePatient}>
            <Text style={styles.btnText}>Patient Login 🩹</Text>
            <Text style={styles.secondBtnText}> If you are receiving care, please click here.</Text>
          </TouchableOpacity>
          {showPatientForm && (
            <View style={styles.fieldsContainer}>
              <TextInput style={styles.input} placeholder="Patient MRN" onFocus={viewHelper} onBlur={viewHelper} />
              <PatientLoginButton onPress={handlePatientLogin} title="Login" />
            </View>
          )}
          {renderView && <View>
            <Text>{'\n'}</Text>
            <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
            <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
          </View>}
        </View>
      </View>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginTop: 10,
    width: '100%',
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  logoImageRight: {
    width: 160,
    height: 170,
  },
  logo: {
    fontSize: 50,
    color: '#2596be',
    marginBottom: 40,
    fontFamily: 'CairoLite',
  },
  italicText: {
    fontFamily: 'CairoMed', // Apply Cairo font to italicText
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#0077a8',
    borderRadius: 25,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    elevation: 3, // Add elevation for shadow effect
  },
  finalLoginBtn: {
    width: '30%',
    backgroundColor: '#0077a8',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center', // align vertically
    alignItems: 'center', // align horizontally
    marginTop: 20,
    marginBottom: 10,
    elevation: 3, // Add elevation for shadow effect
  },
  btnText: {
    color: 'white',
    fontSize: 28,
    padding: 4,
  },
  secondBtnText: {
    color: 'white',
    fontSize: 15,
  },
  fieldsContainer: {
    width: '80%',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  separator: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  orText: {
    marginHorizontal: 10,
    color: '#777',
    fontSize: 23,
    fontWeight: 'bold',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#777',
  },
  smallBtnText: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
  },
  scrollContainer: {
    width: '100%',
    backgroundColor: "white",
    height: '110%',
  },
  boxStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});


