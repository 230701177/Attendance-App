import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert, Modal, TextInput } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 1. Change Password
  const handleChangePassword = () => {
    setSettingsVisible(false);
    setChangePasswordVisible(true);
  };

  const submitPasswordChange = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords don't match");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters");
      return;
    }
    // In a real app, you would verify oldPassword and save newPassword
    Alert.alert("Success", "Password changed successfully!");
    setChangePasswordVisible(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // 2. Export Attendance Data
  const exportAttendanceData = async (format = 'csv') => {
    setSettingsVisible(false);
    try {
      // Simulate getting attendance data from storage
      const attendanceData = await AsyncStorage.getItem('attendanceData') || 'Date,Status\n2023-01-01,Present';
      
      let content = '';
      let filename = '';
      
      if (format === 'csv') {
        content = attendanceData;
        filename = 'attendance.csv';
      } else if (format === 'txt') {
        content = attendanceData.replace(/,/g, '  ');
        filename = 'attendance.txt';
      }
      
      const fileUri = FileSystem.documentDirectory + filename;
      await FileSystem.writeAsStringAsync(fileUri, content, { encoding: FileSystem.EncodingType.UTF8 });
      
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Sharing not available on this device");
        return;
      }
      
      await Sharing.shareAsync(fileUri, { mimeType: format === 'csv' ? 'text/csv' : 'text/plain' });
    } catch (error) {
      Alert.alert("Error", "Failed to export data: " + error.message);
    }
  };

  // 3. Reset App Data
  const resetAppData = () => {
    setSettingsVisible(false);
    Alert.alert(
      "Reset App Data",
      "This will delete all your local data. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert("Success", "App data has been reset");
            } catch (error) {
              Alert.alert("Error", "Failed to reset data");
            }
          }
        }
      ]
    );
  };

  // 4. Logout
  const handleLogout = () => {
    setSettingsVisible(false);
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            // In a real app, you would clear user state here
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: "#121212" }}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={require('../assets/profile.png')} style={styles.profileImage} />
        <Text style={styles.welcomeText}>WELCOME !!</Text>
        <Text style={styles.nameText}>Name : Manoharan</Text>
        <Text style={styles.departmentText}>Department : CSE</Text>
        <Text style={styles.registerNumberText}>Register Number : 230701177</Text>
      </View>

      {/* Drawer Items */}
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} labelStyle={{ color: "#FFF" }} />
      </View>

      {/* Settings Button */}
      <TouchableOpacity 
        style={styles.drawerItem} 
        onPress={() => setSettingsVisible(true)}
      >
        <Ionicons name="settings-outline" size={22} color="#FFF" />
        <Text style={styles.drawerLabel}>Settings</Text>
      </TouchableOpacity>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsVisible}
        onRequestClose={() => setSettingsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Settings</Text>
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={handleChangePassword}
            >
              <Ionicons name="key-outline" size={20} color="#333" />
              <Text style={styles.modalOptionText}>Change Password</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={() => exportAttendanceData('csv')}
            >
              <Ionicons name="download-outline" size={20} color="#333" />
              <Text style={styles.modalOptionText}>Export as CSV</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={() => exportAttendanceData('txt')}
            >
              <Ionicons name="document-text-outline" size={20} color="#333" />
              <Text style={styles.modalOptionText}>Export as TXT</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={resetAppData}
            >
              <Ionicons name="trash-outline" size={20} color="#333" />
              <Text style={styles.modalOptionText}>Reset App Data</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.modalOption}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#333" />
              <Text style={styles.modalOptionText}>Logout</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setSettingsVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Change Password Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={changePasswordVisible}
        onRequestClose={() => setChangePasswordVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Change Password</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Old Password"
              secureTextEntry
              value={oldPassword}
              onChangeText={setOldPassword}
            />
            
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setChangePasswordVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.submitButton]}
                onPress={submitPasswordChange}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333"
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10
  },
  welcomeText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
  },
  nameText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  departmentText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center"
  },
  registerNumberText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center"
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333"
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#FFF"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  modalOptionText: {
    marginLeft: 10,
    fontSize: 16
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#121212',
    borderRadius: 5,
    alignItems: 'center'
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5
  },
  cancelButton: {
    backgroundColor: '#ccc'
  },
  submitButton: {
    backgroundColor: '#121212'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  }
});