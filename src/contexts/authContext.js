import { createContext, useContext, Context } from "react";
import useFirebaseAuth from "@/hooks/useFirebaseAuth";

// Create auth context
const authContext = createContext({
  authUser: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  verifyEmail: async () => {},
  continueWithGoogle: async () => {},
});

// Auth user context provider
function AuthContextProvider({ children }) {
  // Get auth state
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Export context and hook
export default AuthContextProvider;
export const useAuth = () => useContext(authContext);
