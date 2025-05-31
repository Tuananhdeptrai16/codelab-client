// src/contexts/AuthContext.js
import { createContext, useContext,  useState } from 'react';

const AppThemeContext = createContext();

export const useThemeState = () => useContext(AppThemeContext);

const AppThemeAction = createContext();

export const useThemeAction = () => useContext(AppThemeAction);

const AppThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
      });
      const handleChangeTheme = () => {
        setTheme((prevTheme) => {
          const newTheme = prevTheme === "light" ? "dark" : "light";
          localStorage.setItem("theme", newTheme);
          return newTheme;
        });
      };
    return (
        <AppThemeContext.Provider value={{theme}}>
            <AppThemeAction.Provider value={{handleChangeTheme}}>
                {children}
            </AppThemeAction.Provider>
        </AppThemeContext.Provider>
    )
}

export default AppThemeContextProvider;
