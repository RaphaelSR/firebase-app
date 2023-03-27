import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ModalContext } from "../../contexts/modalContext";

const CustomModal: React.FC = () => {
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
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxWidth: "80%",
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalButtonText: {
    fontSize: 16,
    color: "blue",
  },
});

export default CustomModal;
