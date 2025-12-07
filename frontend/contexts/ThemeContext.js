import React, { createContext, useContext } from "react";
import defaultTheme from "@/theme";

const ThemeContext = createContext(defaultTheme);

/**
 * Theme Provider component that provides theme access to all child components
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {Object} [props.theme] - Custom theme object (optional, defaults to app theme)
 */
export const ThemeProvider = ({ children, theme: customTheme = defaultTheme }) => {
  return <ThemeContext.Provider value={customTheme}>{children}</ThemeContext.Provider>;
};

/**
 * Hook to access the current theme
 * @returns {Object} The current theme object
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

/**
 * Higher-order component that injects theme as a prop
 * @param {React.Component} Component - Component to wrap
 * @returns {React.Component} Wrapped component with theme prop
 */
export const withTheme = (Component) => {
  const ThemedComponent = (props) => {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };

  ThemedComponent.displayName = `withTheme(${Component.displayName || Component.name})`;
  return ThemedComponent;
};

export default ThemeContext;
