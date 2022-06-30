import { FC, ReactNode, useState, createContext } from "react";

const INITIAL_STATE = {
  id: 0,
  token: "",
  username: "",
}

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthState {
  id: number;
  token: string;
  username: string;
}

interface AuthContextValue {
  authState: AuthState;
  setAuthState: (state: AuthState) => void;
  isAuthenticated: () => boolean;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  authState: INITIAL_STATE,
  setAuthState: () => null,
  isAuthenticated: () => false,
  logOut: () => null
});

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(INITIAL_STATE);

  // checks if the user is authenticated or not
  const isAuthenticated = () => !!authState.token;

  const logOut = () => setAuthState(INITIAL_STATE)

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState,
        isAuthenticated,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };