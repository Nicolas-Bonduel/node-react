import { createContext } from "react";

import useTheme from "../hooks/useTheme";


export const ThemeContext = createContext();


/**
 * Theme Context Provider
 */
const ThemeProvider = ({ children }) => {
    
    const theme = useTheme();


  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );

};

export default ThemeProvider;