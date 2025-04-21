import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Alert,
  Pressable,
  Platform 
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function LoginScreen({ navigation, route }) {
  const { role } = route.params || { role: 'Student' };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError("Fill this field ⚠️");
      return;
    }
    
    // Simple validation - replace with your actual authentication logic
    if (username === 'admin' && password === '1234') {
      Alert.alert("Success", "Login successful!");
      // Navigate to MainApp and clear navigation history
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainApp' }],
      });
    } else {
      Alert.alert("Error", "Invalid username or password");
    }
    navigation.reset({
    index: 0,
    routes: [{ 
    name: role === 'Faculty' ? 'FacultyApp' : 'StudentApp' 
      }],
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        hitSlop={20} // Makes the touch area larger
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Image 
        source={require('../assets/logo.png')} 
        style={styles.logo} 
        resizeMode="contain"
      />
      
      <Text style={styles.title}>{role.toUpperCase()} LOGIN</Text>

      <View style={styles.inputBox}>
        <MaterialIcons name="person" size={24} color="white" style={styles.icon} />
        <TextInput 
          placeholder="Username"
          placeholderTextColor="#bbb"
          style={styles.input}
          value={username}
          onChangeText={(text) => { 
            setUsername(text); 
            setError(''); 
          }}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      {error && !username && <Text style={styles.error}>{error}</Text>}

      <View style={styles.inputBox}>
        <MaterialIcons name="lock" size={24} color="white" style={styles.icon} />
        <TextInput 
          placeholder="Password"
          placeholderTextColor="#bbb"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => { 
            setPassword(text); 
            setError(''); 
          }}
        />
      </View>
      {error && !password && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.signupLink}>
        Don't have an account?  
        <Text 
          style={styles.signupText} 
          onPress={() => navigation.navigate("RoleSelection")}
        >
          {' '}Sign Up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  logo: {
    width: 270,
    height: 200,
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#333',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#ff0000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupLink: {
    color: 'white',
    marginTop: 20,
    fontSize: 16,
  },
  signupText: {
    color: '#ff0000',
    fontWeight: 'bold',
  },
  error: {
    color: '#ff4444',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 15,
    fontSize: 14,
  },
});