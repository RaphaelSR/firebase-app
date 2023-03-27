import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Image,
} from "react-native";
import { Avatar, Button, useTheme } from "react-native-paper";
import { createStyles } from "./styles";
import { useAuth } from "../../hooks/useAuth";
import ArrowBack from "../../components/arrowBack";
import SafeAreaViewWrapper from "../../components/safeAreaViewWrapper";
import { ModalContext } from "../../contexts/modalContext";
import { useThemeContext } from "../../contexts/themeContext";
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
  Callback,
} from "react-native-image-picker";
import { AvatarWithGradient } from "../../components/avatarWithGradient.tsx";
import { DisplayNameInput } from "../../components/displayNameInput";

export function Profile({ navigation }) {
  const {
    currentUser,
    resetPassword,
    logout,
    updateUserInfo,
    uploadAvatar,
    getCurrentUser,
  } = useAuth();
  const { colors } = useTheme();
  const { showModal, hideModal } = useContext(ModalContext);
  const styles = createStyles();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [isTextInputFocused, setIsTextInputFocused] = useState(false);
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ""
  );

  useEffect(() => {
    const unsubscribe = getCurrentUser((user) => {
      if (user) {
        setDisplayName(user.displayName || "");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleResetPassword = () => {
    if (currentUser?.email) {
      resetPassword(currentUser.email);
    }
    hideModal();
  };

  const handleLogout = () => {
    showModal({
      message: "Are you sure you want to logout?",
      onConfirm: () => {
        logout();
        hideModal();
      },
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
  };

  const handleUpdateDisplayName = async () => {
    if (displayName !== currentUser?.displayName) {
      await updateUserInfo(displayName);
    }
  };

  return (
    <SafeAreaViewWrapper>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <ArrowBack />
            <AvatarWithGradient
              imageUrl={currentUser?.photoURL}
              displayName={currentUser?.displayName}
              gradientColors={[colors.primary, colors.primaryVariant]}
              size={70}
              style={styles.avatar}
              originScreen="profile"
            />
          </View>
          <View style={styles.infoContainer}>
          <DisplayNameInput
            displayName={displayName}
            setDisplayName={setDisplayName}
            handleUpdateDisplayName={handleUpdateDisplayName}
            isTextInputFocused={isTextInputFocused}
            setIsTextInputFocused={setIsTextInputFocused}
          />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.textInput}
              value={currentUser?.email}
              editable={false}
            />
            <View style={styles.darkModeContainer}>
              <Text style={styles.label}>Dark Mode</Text>
              <Switch
                trackColor={{ false: "#767577", true: colors.primary }}
                thumbColor={isDarkMode ? colors.primary : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleTheme}
                value={isDarkMode}
              />
            </View>
            <Button
              mode="outlined"
              onPress={() =>
                showModal({
                  message: "Are you sure you want to reset your password?",
                  onConfirm: handleResetPassword,
                  confirmButtonText: "Yes",
                  cancelButtonText: "No",
                })
              }
              style={styles.button}
            >
              Reset Password
            </Button>
            <Button
              mode="outlined"
              onPress={handleLogout}
              style={styles.button}
              color={colors.text}
            >
              Logout
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaViewWrapper>
  );
}
