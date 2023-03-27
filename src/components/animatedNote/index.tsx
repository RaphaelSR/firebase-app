import React, { useEffect } from "react";
import { Animated, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { createStyles } from "./styles";

interface AnimatedNoteProps {
  title: string;
  completed: boolean;
  id: string;
  onPress: () => void;
}

function AnimatedNote({ title, completed, id, onPress }: AnimatedNoteProps) {
  const styles = createStyles();
  const { colors } = useTheme();
  const fadeAnim = new Animated.Value(0);
  const textDecorationLine = completed ? "line-through" : "none";
  const textColor = completed ? colors.text + "88" : colors.text;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }} onTouchEnd={onPress}>
      <Text style={[styles.note, { textDecorationLine, color: textColor }]}>
        {title}
      </Text>
    </Animated.View>
  );
}

export default AnimatedNote;
