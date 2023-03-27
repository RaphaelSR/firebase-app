import React, { createContext, useState } from "react";

type LoadingContextProps = {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
};

export const LoadingContext = createContext<LoadingContextProps>({
  isLoading: false,
  setLoading: () => {},
});

export const LoadingProvider: React.FC = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
