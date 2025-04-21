import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function FacultyHome() {
  const navigation = useNavigation();
  const [activeButton, setActiveButton] = useState(null);

  const recentClasses = [
    { name: "Java", time: "9:00 AM", date: "Today" },
    { name: "Data Structures", time: "11:00 AM", date: "Today" },
    { name: "Design and Analysis Of Algorithms", time: "2:00 PM", date: "Tomorrow" }
  ];

  const handlePressIn = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handlePressOut = () => {
    setActiveButton(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.openDrawer()} 
          style={[styles.menuButton, activeButton === 'menu' && styles.activeButton]}
          onPressIn={() => handlePressIn('menu')}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.heading}>Faculty Dashboard</Text>
      </View>

      {/* Faculty Info */}
      <View style={styles.infoCard}>
        <Text style={styles.name}>Dr. John</Text>
        <Text style={styles.details}>Computer Science Department</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionCard, activeButton === 'attendance' && styles.activeActionCard]}
          onPress={() => navigation.navigate("HeadcountVerification")}
          onPressIn={() => handlePressIn('attendance')}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <LinearGradient colors={["#4CAF50", "#2E7D32"]} style={styles.gradient}>
            <Ionicons name="people" size={32} color="white" />
          </LinearGradient>
          <Text style={styles.actionText}>Take Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionCard, activeButton === 'analytics' && styles.activeActionCard]}
          onPress={() => navigation.navigate("Analytics")}
          onPressIn={() => handlePressIn('analytics')}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <LinearGradient colors={["#2196F3", "#1565C0"]} style={styles.gradient}>
            <Ionicons name="analytics" size={32} color="white" />
          </LinearGradient>
          <Text style={styles.actionText}>View Reports</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Classes */}
      <Text style={styles.sectionTitle}>Recent Classes</Text>
      {recentClasses.map((classItem, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.classCard, activeButton === `class-${index}` && styles.activeClassCard]}
          onPress={() => navigation.navigate("HeadcountVerification", { className: classItem.name })}
          onPressIn={() => handlePressIn(`class-${index}`)}
          onPressOut={handlePressOut}
          activeOpacity={0.7}
        >
          <View style={styles.classInfo}>
            <Text style={styles.className}>{classItem.name}</Text>
            <Text style={styles.classTime}>{classItem.time} • {classItem.date}</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  menuButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  heading: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  name: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    color: '#BBB',
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    width: '48%',
    alignItems: 'center',
    borderRadius: 12,
    padding: 8,
  },
  activeActionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  gradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  classCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  activeClassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  classInfo: {
    flex: 1,
  },
  className: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  classTime: {
    color: '#BBB',
    fontSize: 14,
  },
});