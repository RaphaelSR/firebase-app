import React, { createContext, useCallback, useState, ReactNode } from "react";

interface ModalContextData {
  showModal: (options: {
    message?: string;
    content?: ReactNode;
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
  modalContent?: ReactNode;
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
      message?: string;
      onConfirm?: () => void;
      confirmButtonText?: string;
      cancelButtonText?: string;
      content?: ReactNode;
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
        modalContent: modalConfig.content,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
