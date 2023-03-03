import {useState} from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    // Chame o serviço de autenticação para validar o email e senha e obter um token
    const token = await authService.authenticate(email, password);
    setToken(token);
  };

  const logout = () => {
    setToken(null);
  };

  return {token, login, logout};
}
