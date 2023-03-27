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

  const AvatarOptions = () => {
    return (
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Choose an option</Text>
        <Button onPress={handleViewAvatar}>View current photo</Button>
        <Button onPress={() => handleChooseAvatar("camera")}>
          Take a new photo
        </Button>
        <Button onPress={() => handleChooseAvatar("gallery")}>
          Choose from gallery
        </Button>
        <Button onPress={hideModal}>Cancel</Button>
      </View>
    );
  };

  const handleViewAvatar = () => {
    // Implementar a lógica para visualizar a foto do avatar.
  };
  const handleChooseAvatar = async (source: string) => {
    const options: {
      mediaType: MediaType;
      includeBase64: boolean;
      maxHeight: number;
      maxWidth: number;
    } = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    const callback: Callback = async (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else if (response.assets) {
        await uploadAvatar(response.assets[0].uri || "");
      }
    };

    if (source === "camera") {
      launchCamera(options, callback);
    } else if (source === "gallery") {
      launchImageLibrary(options, callback);
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
              onPress={() => showModal({ content: <AvatarOptions /> })}
              style={styles.avatar}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: isTextInputFocused
                    ? colors.primary
                    : colors.placeholder,
                },
              ]}
              value={displayName}
              placeholder="Type your first name"
              onChangeText={setDisplayName}
              onSubmitEditing={handleUpdateDisplayName}
              onFocus={() => setIsTextInputFocused(true)}
              onBlur={() => setIsTextInputFocused(false)}
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
              color={colors.text}
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
