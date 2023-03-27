import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Modal, Portal, Text, useTheme } from "react-native-paper";

import { ModalContext } from "../../contexts/modalContext";
import { createStyles } from "./styles";

const CustomModal: React.FC = () => {
  const styles = createStyles();
  const { colors } = useTheme();
  const {
    modalVisible,
    hideModal,
    modalMessage,
    modalOnConfirm,
    modalConfirmButtonText,
    modalCancelButtonText,
    modalContent,
  } = useContext(ModalContext);

  if (!modalVisible) {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContent}
        dismissable={!!modalContent}
      >
        {modalContent ? (
          <>
            {modalMessage && (
              <Text style={styles.modalMessage}>{modalMessage}</Text>
            )}
            {modalContent}
          </>
        ) : (
          <>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={hideModal}>
                <Text style={styles.modalButtonText}>
                  {modalCancelButtonText || "Cancel"}
                </Text>
              </TouchableOpacity>
              {modalOnConfirm && (
                <TouchableOpacity
                  onPress={() => {
                    modalOnConfirm();
                    hideModal();
                  }}
                >
                  <Text style={styles.modalButtonText}>
                    {modalConfirmButtonText || "Confirm"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </Modal>
    </Portal>
  );
};

export default CustomModal;