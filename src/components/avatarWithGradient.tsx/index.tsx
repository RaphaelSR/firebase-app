import React from "react";
import { TouchableOpacity, Image, StyleProp, ViewStyle } from "react-native";
import { Avatar } from "react-native-paper";
import LinearGradient from "react-native-linear-gradient";

interface AvatarWithGradientProps {
  imageUrl?: string;
  displayName?: string;
  gradientColors: string[];
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const AvatarWithGradient: React.FC<AvatarWithGradientProps> = ({
  imageUrl,
  displayName,
  gradientColors,
  onPress,
  size = 60,
  style,
}) => {
  const borderRadius = size / 2;
  const borderWidth = size / 14;

  return (
    <TouchableOpacity onPress={onPress} style={style}>
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
};
