import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button, Portal, Modal, useTheme} from 'react-native-paper';

type ModalProps = {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  confirmationMessage: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
};

const CustomModal = ({
  visible,
  onDismiss,
  title,
  confirmationMessage,
  onConfirm,
  onCancel = onDismiss,
  confirmButtonText = 'Confirmar',
  cancelButtonText = 'Cancelar',
}: ModalProps) => {
  const {colors} = useTheme();

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalConfirmation}>{confirmationMessage}</Text>
        <View style={styles.modalButtonGroup}>
          <Button mode="text" onPress={onCancel} style={styles.modalButton}>
            {cancelButtonText}
          </Button>
          <Button
            mode="contained"
            onPress={onConfirm}
            style={[styles.modalButton, {backgroundColor: colors.error}]}>
            {confirmButtonText}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalConfirmation: {
    marginBottom: 24,
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
