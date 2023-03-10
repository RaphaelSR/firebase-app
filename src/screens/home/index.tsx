import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import CustomModal from '../../components/modal';
import {useAuth} from '../../hooks/useAuth';

export function Home({navigation}) {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const {logout} = useAuth();

  const handleLogout = () => {
    logout();
    setIsLogoutModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => setIsLogoutModalVisible(true)}
        style={styles.button}>
        Logout
      </Button>
      <CustomModal
        visible={isLogoutModalVisible}
        onDismiss={() => setIsLogoutModalVisible(false)}
        title="Sair da sua conta?"
        confirmationMessage="Você tem certeza que deseja sair da sua conta?"
        onConfirm={handleLogout}
      />
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
  button: {
    marginTop: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  modalButton: {
    width: 120,
  },
});
