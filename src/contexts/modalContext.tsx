import React, { createContext, useCallback, useState, ReactNode } from "react";

interface ModalContextData {
  showModal: (options: {
    message: string;
    onConfirm?: () => void;
    confirmButtonText?: string;
    cancelButtonText?: string;
  }) => void;
  hideModal: () => void;
  modalVisible: boolean;
  modalMessage: string;
  modalOnConfirm?: () => void;
  modalConfirmButtonText?: string;
  modalCancelButtonText?: string;
}

interface ModalConfig {
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  content?: ReactNode;
}

export const ModalContext = createContext<ModalContextData>(
  {} as ModalContextData
);

export const ModalProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    message: "",
  });

  const showModal = useCallback(
    (options: {
      message: string;
      onConfirm?: () => void;
      confirmButtonText?: string;
      cancelButtonText?: string;
    }) => {
      setModalConfig(options);
      setModalVisible(true);
    },
    []
  );

  const hideModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        showModal,
        hideModal,
        modalVisible,
        modalMessage: modalConfig.message,
        modalOnConfirm: modalConfig.onConfirm,
        modalConfirmButtonText: modalConfig.confirmButtonText,
        modalCancelButtonText: modalConfig.cancelButtonText,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
