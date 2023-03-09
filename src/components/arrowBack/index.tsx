import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

type ArrowBackProps = {
  color?: string;
};

const ArrowBack = ({color}: ArrowBackProps) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return (
    <IconButton
      icon={() => (
        <Icon name="arrow-back" size={30} color={color || colors.primary} />
      )}
      onPress={() => navigation.goBack()}
    />
  );
};

export default ArrowBack;
