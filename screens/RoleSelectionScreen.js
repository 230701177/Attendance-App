import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';

export default function RoleSelectionScreen({ navigation }) {
  const handleRoleSelection = (role, screen) => {
    navigation.navigate(screen, { role });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../assets/logo.png')} // Add your logo in assets
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Select Your Role</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I HAVE AN ACCOUNT</Text>
          <TouchableOpacity 
            style={[styles.button, styles.studentButton]}
            onPress={() => handleRoleSelection('Student', 'Login')}
          >
            <Text style={styles.buttonText}>Login as Student</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.facultyButton]}
            onPress={() => handleRoleSelection('Faculty', 'Login')}
          >
            <Text style={styles.buttonText}>Login as Faculty</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I'M NEW HERE</Text>
          <TouchableOpacity 
            style={[styles.button, styles.signupButton]}
            onPress={() => handleRoleSelection('Student', 'Signup')}
          >
            <Text style={styles.buttonText}>Sign Up as Student</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.signupButton]}
            onPress={() => handleRoleSelection('Faculty', 'Signup')}
          >
            <Text style={styles.buttonText}>Sign Up as Faculty</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 275,
    height: 250,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  studentButton: {
    backgroundColor: '#4CAF50', // Green
  },
  facultyButton: {
    backgroundColor: '#2196F3', // Blue
  },
  signupButton: {
    backgroundColor: '#0000FF', // Orange
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  orText: {
    color: '#aaa',
    paddingHorizontal: 10,
    fontSize: 14,
  },
});