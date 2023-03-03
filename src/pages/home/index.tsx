import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

export function Home() {
  const {colors} = useTheme();
  return (
    <View style={styles.container}>
      <Text variant="displayLarge" style={{color: colors.primary}}>
        Dashboard
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
});
