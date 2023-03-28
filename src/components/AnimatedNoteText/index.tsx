import React, { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { createStyles } from "./styles";

interface AnimatedNoteTextProps {
  title: string;
  completed: boolean;
  onPress: () => void;
}

function AnimatedNoteText({
  title,
  completed,
  onPress,
}: AnimatedNoteTextProps) {
  const styles = createStyles();
  const { colors } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(1)); // Adicionar estado
  const completedRef = useRef(completed);
  const textDecorationLine = completed ? "line-through" : "none";
  const textColor = completed ? colors.text + "88" : colors.text;

  useEffect(() => {
    if (completedRef.current !== completed) {
      completedRef.current = completed;
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [completed, fadeAnim]);

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }} onTouchEnd={onPress}>
      <Text style={[styles.note, { textDecorationLine, color: textColor }]}>
        {title}
      </Text>
    </Animated.View>
  );
}

export default AnimatedNoteText;
