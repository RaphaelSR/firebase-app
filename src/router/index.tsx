import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/useAuth";
import { ModalProvider } from "../contexts/modalContext";
import CustomModal from "../components/customModal";

export function Routes() {
  const { currentUser } = useAuth();

  return (
      <NavigationContainer>
        <ModalProvider>
          {currentUser ? <AppRoutes /> : <AuthRoutes />}
          <CustomModal />
        </ModalProvider>
      </NavigationContainer>
  );
}
