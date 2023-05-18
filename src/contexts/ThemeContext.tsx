import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { Button } from 'antd';

interface Theme {
  primaryColor: string;
  secondaryColor: string;
}

interface ThemeContextType {
  themeType: string;
  changeThemeType: (themeType: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  themeType: 'light',
  changeThemeType: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeType, changeThemeType] = useState('light');
  const [isHidden, setIsHidden] = useState(false);

  const toggleHidden = () => setIsHidden((prevHidden) => !prevHidden);

  useEffect(() => {
    let themeType = localStorage.getItem('themeType');
    if (themeType) {
      changeThemeType(themeType);
      return;
    }
    localStorage.setItem('themeType', 'light');
    changeThemeType('light');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.shiftKey && event.key === 'k') {
        toggleHidden();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ themeType, changeThemeType }}>
      <div >
        <div className={isHidden?'py-2 flex justify-center hidden':'py-2 flex justify-center'}>
          <Button type="primary" onClick={
            ()=>{
              
              localStorage.setItem("themeType",themeType==="dark"?"light":"dark")
    
              changeThemeType(themeType==="dark"?"light":"dark")
            }
          }>Change Theme (Cmd+Shift+K) to toggle</Button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
