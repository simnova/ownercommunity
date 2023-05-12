import React, { ReactNode, createContext, useState } from 'react';

interface Theme {
  primaryColor: string;
  secondaryColor: string;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (updatedTheme: Theme) => void;
}

const initialTheme: Theme = {
  primaryColor: '#000000',
  secondaryColor: '#ffffff'
};

// export const ThemeContext = createContext({
//   theme: initialTheme,
//   setTheme: () => {}
// });
// create ThemeContext of type ThemeContextType
export const ThemeContext = createContext<ThemeContextType>({
  theme: initialTheme,
  setTheme: (updatedTheme: Theme) => {}
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const handleSetTheme = (updatedTheme: Theme) => {
    setTheme(updatedTheme);
  };
  return <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>{children}</ThemeContext.Provider>;
};
