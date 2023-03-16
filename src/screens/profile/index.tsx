import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Switch } from "react-native";
import { Avatar, Button, useTheme } from "react-native-paper";
import CustomModal from "../../components/modal";
import { useAuth } from "../../hooks/useAuth";
import ArrowBack from "../../components/arrowBack";
import SafeAreaViewWrapper from "../../components/safeAreaViewWrapper";

export function Profile({ navigation }) {
  const { currentUser, resetPassword, logout } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { colors } = useTheme();

  const handleResetPassword = () => {
    if (currentUser?.email) {
      resetPassword(currentUser.email);
    }
    setIsModalVisible(false);
  };

  return (
    <SafeAreaViewWrapper>
      <View style={styles.content}>
        <View style={styles.header}>
          <ArrowBack />
          <Avatar.Text
            size={56}
            label={currentUser?.displayName?.slice(0, 1)}
            style={[styles.avatar, { backgroundColor: colors.primary }]}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Email</Text>
          <TextInput
            style={[
              styles.textInput,
              { borderColor: colors.text, color: colors.text },
            ]}
            value={currentUser?.email}
            editable={false}
          />
          <View style={styles.darkModeContainer}>
            <Text style={[styles.label, { color: colors.text }]}>
              Dark Mode
            </Text>
            <Switch
              trackColor={{ false: "#767577", true: colors.primary }}
              thumbColor={darkMode ? colors.primary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setDarkMode}
              value={darkMode}
            />
          </View>
          <Button
            mode="outlined"
            onPress={() => setIsModalVisible(true)}
            style={[styles.button, { borderColor: colors.text }]}
            color={colors.text}
          >
            Reset Password
          </Button>
          <Button
            mode="outlined"
            onPress={logout}
            style={[styles.button, { borderColor: colors.text }]}
            color={colors.text}
          >
            Logout
          </Button>
        </View>
        <CustomModal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          title="Reset Password"
          confirmationMessage="Are you sure you want to reset your password?"
          onConfirm={handleResetPassword}
        />
      </View>
    </SafeAreaViewWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
  },
  avatar: {},
  infoContainer: {
    marginTop: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textInput: {
    height: 40,
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    color: "#ffffff",
    backgroundColor: "#8e8e8e",
    opacity: 0.6,
  },
  darkModeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    borderWidth: 1,
  },
});
