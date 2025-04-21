import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function FacultyDrawerContent(props) {
  const navigation = useNavigation();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Faculty Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileIcon}>
          <Ionicons name="person" size={60} color="#FFF" />
        </View>
        <Text style={styles.name}>Dr. John</Text>
        <Text style={styles.department}>Computer Science Department</Text>
        <Text style={styles.email}>John@rajalakshmi.edu.in</Text>
      </View>

      {/* Main Drawer Items */}
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>

      {/* Faculty-Specific Options */}
      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => navigation.navigate('AttendanceReports')}
      >
        <Ionicons name="analytics" size={24} color="#FFF" />
        <Text style={styles.drawerText}>Attendance Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.drawerItem}
        onPress={() => navigation.navigate('ClassManagement')}
      >
        <Ionicons name="people" size={24} color="#FFF" />
        <Text style={styles.drawerText}>Manage Classes</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity 
        style={[styles.drawerItem, styles.logoutButton]}
        onPress={() => navigation.navigate('Login')}
      >
        <Ionicons name="log-out" size={24} color="#FFF" />
        <Text style={styles.drawerText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  profileSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    alignItems: 'center',
  },
  profileIcon: {
    backgroundColor: '#333',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  department: {
    color: '#BBB',
    fontSize: 14,
    marginBottom: 5,
  },
  email: {
    color: '#888',
    fontSize: 12,
  },
  drawerItems: {
    flex: 1,
    marginTop: 10,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  drawerText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 'auto',
    backgroundColor: '#D32F2F',
  },
});