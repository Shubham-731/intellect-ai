import { createContext, useContext, useEffect, useState } from "react";

const themeContext = createContext({
  theme: "",
  handleThemeChange: () => {},
});

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    // Check the user's preferred color scheme and set the theme
    const preferredColorScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";

    document.documentElement.setAttribute("data-theme", preferredColorScheme);
    document.documentElement.style.colorScheme = preferredColorScheme;
    setTheme(preferredColorScheme);
  }, []);

  // Handle theme change
  const handleThemeChange = (favTheme) => {
    document.documentElement.setAttribute("data-theme", favTheme);
    document.documentElement.style.colorScheme = favTheme;
    setTheme(favTheme);
  };

  return (
    <themeContext.Provider value={{ theme, handleThemeChange }}>
      {children}
    </themeContext.Provider>
  );
}

export default ThemeContextProvider;
export const useTheme = () => useContext(themeContext);
