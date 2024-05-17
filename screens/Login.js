import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Animated, ScrollView, Dimensions } from 'react-native';
import { useFonts, Cairo_500Medium, Cairo_300Light } from '@expo-google-fonts/cairo'; 

export default function LoginBox({ navigation }) {
  const [showLwrTxtNurse, setShowLwrTxtNurse] = useState(true);
  const [showNurseForm, setShowNurseForm] = useState(false);
  const [showLwrTxtPatient, setShowLwrTxtPatient] = useState(true);
  const [showPatientForm, setShowPatientForm] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window')
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ window });
    });
    return () => subscription?.remove();
  }, []);

  const { window } = dimensions;
  const windowWidth = window.width;
  const LLsize = windowWidth > 800 ? 120 : 70;
  const RLsize = windowWidth > 800 ? 200 : 125;
  const RLmargin = windowWidth > 800 ? 0 : 10;
  const scText = windowWidth > 400 ? 50 : 35;
  const loginWidth = windowWidth > 400 ? '80%' : '60%'
  const logButText = windowWidth > 400 ? 30 : 25

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
    setShowLwrTxtNurse(!showLwrTxtNurse);
    setShowLwrTxtPatient(true);
    setShowNurseForm(!showNurseForm);
    setShowPatientForm(false);
  };

  const handlePatientLogin = () => {
    navigation.navigate("Patient");
  };

  const handlePatient = () => {
    setShowLwrTxtPatient(!showLwrTxtPatient);
    setShowLwrTxtNurse(true);
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

  const [fontsLoaded] = useFonts({
    CairoMed: Cairo_500Medium,
    CairoLite: Cairo_300Light,
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View 
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 500 }}
      >
        <View style={styles.logoContainer}>
          <Image source={require('../hackensack.jpg')} style={{ width: LLsize, height: LLsize, marginTop: RLmargin }} />
          <Image source={require('../MMP.png')} style={{width: RLsize, height: 100}} />
        </View>

        <View style={styles.boxStyle}>
          <Animated.Text style={[styles.logo, { opacity: fadeAnim, fontSize: scText , transform: [{ translateX: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [-100, 0] }) }] }]}>
            Welcome To <Text style={styles.italicText}>SurgiCalm™</Text>
          </Animated.Text>

          <TouchableOpacity style={[styles.loginBtn, {width: loginWidth}]} onPress={handleNurse}>
            <Text style={[styles.btnTxtUpper, {fontSize: logButText}]}>Caregiver Login 🩺</Text>
          </TouchableOpacity>
          {showLwrTxtNurse && (
            <Text style={styles.btnTxtLower}> If you are a professional, please click here.</Text>
          )}
          {showNurseForm && (
            <View style={styles.fieldsContainer}>
              <TextInput style={styles.input} placeholder="Nurse Username" onFocus={viewHelper} onBlur={viewHelper} />
              <TextInput style={styles.input} placeholder="Nurse Password" secureTextEntry={true} onFocus={viewHelper} onBlur={viewHelper} />
              <NurseLoginButton onPress={handleNurseLogin} title="Login" />
            </View>
          )}

          <View style={styles.separator}>
            <View style={styles.line}></View>
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line}></View>
          </View>

          <TouchableOpacity style={[styles.loginBtn, {width: loginWidth}]} onPress={handlePatient}>
            <Text style={[styles.btnTxtUpper, {fontSize: logButText}]}>Patient Login 🩹</Text>
          </TouchableOpacity>
          {showLwrTxtPatient && (
            <Text style={styles.btnTxtLower}> If you are receiving care, please click here.</Text>
          )}
          {showPatientForm && (
            <View style={styles.fieldsContainer}>
              <TextInput style={styles.input} placeholder="Patient MRN" onFocus={viewHelper} onBlur={viewHelper} />
              <PatientLoginButton onPress={handlePatientLogin} title="Login" />
            </View>
          )}
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
  logo: {
    color: '#2596be',
    marginBottom: 40,
    fontFamily: 'CairoLite',
  },
  italicText: {
    fontFamily: 'CairoMed',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#0077a8',
    borderRadius: 25,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    elevation: 3,
  },
  finalLoginBtn: {
    width: '30%',
    backgroundColor: '#0077a8',
    borderRadius: 25,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    elevation: 3,
  },
  btnTxtUpper: {
    textAlign: 'center',
    fontFamily: 'CairoMed',
    color: 'white',
    fontSize: 30,
  },
  btnTxtLower: {
    textAlign: 'center',
    fontFamily: 'CairoLite',
    color: 'black',
    fontSize: 20,
  },
  fieldsContainer: {
    width: '80%',
    margin: 10,
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



