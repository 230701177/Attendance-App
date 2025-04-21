// screens/MyAttendanceScreen.js

import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyAttendanceScreen() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("attendanceData");
        if (storedData) {
          const parsed = storedData
            .split("\n")
            .slice(1) // skip header
            .map((line) => {
              const [date, status] = line.split(",");
              return { date, status };
            });
          setAttendanceData(parsed);
        }
      } catch (err) {
        console.error("Failed to load attendance data:", err);
      }
    };

    loadData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={[styles.status, item.status === "Present" ? styles.present : styles.absent]}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Attendance</Text>
      <FlatList
        data={attendanceData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  item: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: "#FFF",
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  present: {
    color: "limegreen",
  },
  absent: {
    color: "tomato",
  },
});