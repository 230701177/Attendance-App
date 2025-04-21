import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import 'react-native-gesture-handler';

// Screens
import BiometricAuthScreen from './screens/BiometricAuthScreen';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import FacultyHome from './screens/FacultyHome';
import StudentHome from './screens/StudentHome';
import HomeScreen from './screens/HomeScreen';
import QRScannerScreen from './screens/QRScannerScreen';
import TimetableScreen from './screens/TimetableScreen';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MyAttendanceScreen from './screens/MyAttendanceScreen'; // ✅ Added

// Components
import FacultyDrawerContent from './components/FacultyDrawerContent';
import StudentDrawerContent from './components/StudentDrawerContent';
import CustomDrawerContent from './screens/CustomDrawerContent';
import QRCodeScanner from './components/QRCodeScanner';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Faculty Drawer Navigator
function FacultyApp() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <FacultyDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: '#121212', width: 240 },
        drawerLabelStyle: { color: '#fff', fontSize: 16, marginLeft: -10 },
        drawerActiveTintColor: '#4CAF50',
        drawerInactiveTintColor: '#BBB',
        drawerActiveBackgroundColor: 'rgba(76, 175, 80, 0.1)',
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={FacultyHome} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="home" size={20} color={color} />
        }}
      />
      <Drawer.Screen 
        name="Timetable" 
        component={TimetableScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="calendar" size={20} color={color} />
        }}
      />
      <Drawer.Screen 
        name="Headcount Verification" 
        component={HeadcountVerification}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="people" size={20} color={color} />
        }}
      />
    </Drawer.Navigator>
  );
}

// Student Drawer Navigator
function StudentApp() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <StudentDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: '#121212', width: 240 },
        drawerLabelStyle: { color: '#fff', fontSize: 16, marginLeft: -10 },
        drawerActiveTintColor: '#4CAF50',
        drawerInactiveTintColor: '#BBB',
        drawerActiveBackgroundColor: 'rgba(76, 175, 80, 0.1)',
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={StudentHome} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="home" size={20} color={color} />
        }}
      />
      <Drawer.Screen 
        name="QRScanner" 
        component={QRScannerScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="qr-code" size={20} color={color} />
        }}
      />
      <Drawer.Screen 
        name="Timetable" 
        component={TimetableScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="calendar" size={20} color={color} />
        }}
      />
      <Drawer.Screen 
        name="MyAttendance" 
        component={MyAttendanceScreen}
        options={{
          drawerIcon: ({ color }) => <Ionicons name="document-text" size={20} color={color} />
        }}
      />
    </Drawer.Navigator>
  );
}

// Main App Drawer Navigator (Alternative flow)
function MainApp() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ 
        headerShown: false,
        drawerStyle: { backgroundColor: '#121212', width: 240 },
        drawerLabelStyle: { color: '#fff', fontSize: 16, marginLeft: -10 },
        drawerActiveTintColor: '#4CAF50',
        drawerInactiveTintColor: '#BBB',
        drawerActiveBackgroundColor: 'rgba(76, 175, 80, 0.1)',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="QRScanner" component={QRScannerScreen} />
      <Drawer.Screen name="Timetable" component={TimetableScreen} />
      <Drawer.Screen name="QRCodeScanner" component={QRCodeScanner} />
    </Drawer.Navigator>
  );
}

// Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [initialRoute, setInitialRoute] = useState('RoleSelection');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkIP = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('https://api.ipify.org?format=json');
        const ip = res.data.ip;
        const allowedIP = '123.123.123.123'; // Change this to your allowed IP

        if (ip === allowedIP) {
          setInitialRoute('Welcome');
        }
      } catch (error) {
        console.error('Error fetching IP:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Uncomment if you want to use IP check
    // checkIP();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false,
            cardStyle: { backgroundColor: '#121212' }
          }}
          initialRouteName={initialRoute}
        >
          {/* Common Screens */}
          <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
          <Stack.Screen name="BiometricAuth" component={BiometricAuthScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          
          {/* Auth Flow */}
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          
          {/* Main App Flows */}
          <Stack.Screen name="FacultyApp" component={FacultyApp} />
          <Stack.Screen name="StudentApp" component={StudentApp} />
          <Stack.Screen name="MainApp" component={MainApp} />
          
          {/* Utility Screens */}
          <Stack.Screen name="StandaloneQRScanner" component={QRCodeScanner} />
          <Stack.Screen name="QRScanner" component={QRScannerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});