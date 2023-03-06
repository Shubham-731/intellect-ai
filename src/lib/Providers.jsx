import AuthContextProvider from "@/contexts/authContext";
import ChatContextProvider from "@/contexts/chatContext";
import ThemeContextProvider from "@/contexts/themeContext";

const Providers = ({ children }) => {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <ChatContextProvider>{children}</ChatContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  );
};
export default Providers;
