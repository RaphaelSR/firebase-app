import React, { useContext } from "react";
import {
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  View,
} from "react-native";
import { Avatar, Button, Text, useTheme } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";
import { ModalContext } from "../../contexts/modalContext";
import {
  Callback,
  launchCamera,
  launchImageLibrary,
  MediaType,
} from "react-native-image-picker";
import { createStyles } from "./styles";

interface AvatarWithGradientProps {
  imageUrl?: string;
  displayName?: string;
  gradientColors: string[];
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
  originScreen?: string;
}

export function AvatarWithGradient({
  imageUrl,
  displayName,
  gradientColors,
  onPress,
  originScreen,
  size = 60,
  style,
}: AvatarWithGradientProps) {
  const borderRadius = size / 2;
  const borderWidth = size / 14;
  const styles = createStyles();
  const { colors } = useTheme();
  const { showModal, hideModal } = useContext(ModalContext);

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
    showModal({
      content: (
        <View style={styles.imageView}>
          <Image source={{ uri: imageUrl }} style={styles.avatarImage} />
          <Button onPress={hideModal} style={styles.closeButton}>
            Close
          </Button>
        </View>
      ),
    });
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

  const handlePress = () => {
    if (originScreen === "profile") {
      showModal({ content: <AvatarOptions /> });
    } else {
      if (onPress) {
        onPress();
      }
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius,
          borderWidth,
          borderColor: "transparent",
          overflow: "hidden",
          width: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: size - borderWidth,
              height: size - borderWidth,
              borderRadius: borderRadius - borderWidth,
            }}
          />
        ) : (
          <Avatar.Text
            size={size - borderWidth}
            label={displayName?.slice(0, 1)}
          />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}
function uploadAvatar(arg0: string) {
  throw new Error("Function not implemented.");
}
