import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ProgressCircle } from 'react-native-svg-charts';

export default function StudentHome() {
  const navigation = useNavigation();

  const overallAttendance = 75;
  const lowAttendanceSubjects = [
    { name: "Operating Systems", attendance: 60 },
    { name: "Internet Of Things", attendance: 65 },
    { name: "Design Thinking", attendance: 70 }
  ];

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return '#4CAF50';
    if (percentage >= 50) return '#FFC107';
    return '#F44336';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
          <Ionicons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.heading}>Attendance Dashboard</Text>
      </View>

      {/* Student Info */}
      <View style={styles.infoCard}>
        <Text style={styles.name}>Manoharan</Text>
        <Text style={styles.details}>CSE | 230701177</Text>
      </View>

      {/* Attendance Progress */}
      <View style={styles.attendanceContainer}>
        <View style={styles.progressContainer}>
          <ProgressCircle
            style={styles.progressCircle}
            progress={overallAttendance / 100}
            progressColor={getAttendanceColor(overallAttendance)}
            startAngle={-Math.PI * 0.8}
            endAngle={Math.PI * 0.8}
            strokeWidth={10}
          />
          <View style={styles.progressTextContainer}>
            <Text style={styles.percentage}>{overallAttendance}%</Text>
            <Text style={styles.label}>Overall Attendance</Text>
          </View>
        </View>
      </View>

      {/* Scan QR Button */}
      <TouchableOpacity 
        style={styles.scanButton}
        onPress={() => navigation.navigate("QRScanner")}
      >
        <LinearGradient colors={["#2196F3", "#1565C0"]} style={styles.scanGradient}>
          <Ionicons name="qr-code" size={24} color="white" />
          <Text style={styles.scanText}>Scan QR for Attendance</Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Low Attendance Subjects */}
      <Text style={styles.sectionTitle}>Subjects Needing Attention</Text>
      {lowAttendanceSubjects.map((subject, index) => (
        <View key={index} style={styles.subjectCard}>
          <Text style={styles.subjectName}>{subject.name}</Text>
          <Text style={[styles.subjectAttendance, { color: getAttendanceColor(subject.attendance) }]}>
            {subject.attendance}%
          </Text>
        </View>
      ))}

      {/* Timetable Button */}
      <TouchableOpacity 
        style={styles.timetableButton}
        onPress={() => navigation.navigate("Timetable")}
      >
        <Text style={styles.timetableText}>View Timetable</Text>
        <Ionicons name="calendar" size={20} color="#2196F3" />
      </TouchableOpacity>
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
  attendanceContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  progressContainer: {
    width: 180,
    height: 180,
    position: 'relative',
  },
  progressCircle: {
    height: 180,
    width: 180,
  },
  progressTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  label: {
    color: '#BBB',
    fontSize: 14,
    marginTop: 4,
  },
  scanButton: {
    marginBottom: 24,
  },
  scanGradient: {
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subjectCard: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectName: {
    color: '#FFF',
    fontSize: 16,
  },
  subjectAttendance: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timetableButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  timetableText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
});