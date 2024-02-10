// Module.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Module = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hello from MyComponent</Text>
      <Text style={styles.paragraph}>This is a simple component exported from Module.js</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 20, 
  },
  header: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10, 
  },
  paragraph: {
    fontSize: 16, 
  }
});

export default Module;

