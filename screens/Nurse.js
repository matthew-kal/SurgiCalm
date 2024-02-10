import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useFonts, Cairo_500Medium, Cairo_300Light } from '@expo-google-fonts/cairo'; 

const Nurse = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [patientId, setPatientId] = useState('');
  const [confirmPatientId, setConfirmPatientId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [patientInfo, setPatientInfo] = useState(null);

  const handleCreateAccount = () => {
    if (patientId !== confirmPatientId) {
      alert('Patient IDs do not match.');
      return;
    }
    alert('Details Authenticated, Account Has Been Created');
  };

  const [fontsLoaded] = useFonts({
    CairoMed: Cairo_500Medium,
    CairoLite: Cairo_300Light,
  });

  const handleSearch = () => {
    if (searchQuery.length === 7 && /^\d+$/.test(searchQuery)) {
      setPatientInfo({
        name: 'John Doe',
        completedModules: 0,
        uncompletedModules: 0,
        completedToday: 0,
      });
    } else {
      alert('Please enter a valid 7-digit Patient MRN.');
      setPatientInfo(null);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Create Patient Account Section */}
      <Text style={styles.title}>Create Patient Account</Text>
      
      {/* Input Fields for Creating Account */}
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Patient First Name"
      />
      
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Patient Last Name"
      />
      
      <TextInput
        style={styles.input}
        value={patientId}
        onChangeText={setPatientId}
        placeholder="Patient MRN"
        keyboardType="numeric"
      />
      
      <TextInput
        style={styles.input}
        value={confirmPatientId}
        onChangeText={setConfirmPatientId}
        placeholder="Confirm Patient MRN"
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleCreateAccount}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      {/* Search Patient Section */}
      <Text style={[styles.title, { marginTop: 40 }]}>Search Patient</Text>
      
      <TextInput
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search by Patient MRN"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

      {/* Display Patient Information */}
      {patientInfo && (
        <View style={styles.patientInfoContainer}>
          <Text style={styles.patientName}>Name: {patientInfo.name}</Text>
          <Text>Completed Modules: {patientInfo.completedModules}</Text>
          <Text>Uncompleted Modules: {patientInfo.uncompletedModules}</Text>
          <Text>Modules Completed Today: {patientInfo.completedToday}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#0077a8',
    marginBottom: 10,
    fontFamily: 'CairoMed',
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#0077a8',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  patientInfoContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  patientName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Nurse;




